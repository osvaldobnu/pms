import { PrismaClient, Menu, ProductDestination } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed (RBAC FINAL)...')

  // 🔥 LIMPAR DADOS (ordem correta)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.comanda.deleteMany()
  await prisma.cancelLog.deleteMany()

  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.table.deleteMany()

  await prisma.user.deleteMany()
  await prisma.rolePermission.deleteMany()
  await prisma.role.deleteMany()

  // ✅ ROLE GERENTE COM TODOS OS MENUS
  const gerente = await prisma.role.create({
    data: {
      name: 'Gerente',
      permissions: {
        create: Object.values(Menu).map(menu => ({
          menu,
        })),
      },
    },
  })

  // 👤 ADMIN
  const senhaHash = await bcrypt.hash('Brigadeiro2@', 10)

  await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'osvaldobnu@gmail.com',
      password: senhaHash,
      roleId: gerente.id,
    },
  })

  // 🏷️ CATEGORIAS
  await prisma.category.createMany({
    data: [
      { name: 'Bebidas', active: true },
      { name: 'Drinks', active: true },
      { name: 'Lanches', active: true },
      { name: 'Porções', active: true },
      { name: 'Pratos', active: true },
    ],
  })

  const categoriasMap = Object.fromEntries(
    (await prisma.category.findMany()).map(cat => [cat.name, cat.id])
  )

  // 🍔 PRODUTOS
  await prisma.product.createMany({
    data: [
      {
        name: 'Coca-Cola Lata',
        price: 6.5,
        destination: ProductDestination.IMEDIATO,
        categoryId: categoriasMap['Bebidas'],
      },
      {
        name: 'Chopp Pilsen',
        price: 12.0,
        destination: ProductDestination.IMEDIATO,
        categoryId: categoriasMap['Bebidas'],
      },
      {
        name: 'Caipirinha',
        price: 18.0,
        destination: ProductDestination.BAR,
        categoryId: categoriasMap['Drinks'],
      },
      {
        name: 'X-Burger',
        price: 18.0,
        destination: ProductDestination.COZINHA,
        categoryId: categoriasMap['Lanches'],
      },
      {
        name: 'X-Bacon',
        price: 22.0,
        destination: ProductDestination.COZINHA,
        categoryId: categoriasMap['Lanches'],
      },
      {
        name: 'Batata Frita',
        price: 25.0,
        destination: ProductDestination.COZINHA,
        categoryId: categoriasMap['Porções'],
      },
      {
        name: 'Prato Feito',
        price: 28.0,
        destination: ProductDestination.COZINHA,
        categoryId: categoriasMap['Pratos'],
      },
    ],
  })

  console.log('✅ Seed FINAL executado com sucesso')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())