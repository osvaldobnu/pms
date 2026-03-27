import { PrismaClient, Role, ProductDestination } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // 🔥 LIMPAR BANCO (ordem importa por causa das FK)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.comanda.deleteMany()
  await prisma.cancelLog.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.table.deleteMany()
  await prisma.user.deleteMany()

  // 👤 USUÁRIOS
  await prisma.user.createMany({
    data: [
      {
        name: 'Administrador',
        email: 'admin@comanda.com',
        password: '123456',
        role: Role.GERENTE,
      },
      {
        name: 'Garçom',
        email: 'garcom@comanda.com',
        password: '123456',
        role: Role.GARCOM,
      },
      {
        name: 'Cozinha',
        email: 'cozinha@comanda.com',
        password: '123456',
        role: Role.COZINHA,
      },
      {
        name: 'Bar',
        email: 'bar@comanda.com',
        password: '123456',
        role: Role.BAR,
      },
      {
        name: 'Caixa',
        email: 'caixa@comanda.com',
        password: '123456',
        role: Role.CAIXA,
      },
    ],
  })

  // 🍽️ MESAS
  for (let i = 1; i <= 20; i++) {
    await prisma.table.create({
      data: {
        number: i,
        status: 'LIVRE',
      },
    })
  }

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

  console.log('✅ Seed finalizado com sucesso!')
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })