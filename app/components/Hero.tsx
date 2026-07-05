"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="blob blob-1" />
            <div className="blob blob-2" />

            <div className="section-container relative z-10 grid lg:grid-cols-2 gap-10 items-center px-6 py-20">
                <div>
                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm">
                        Alimentação Personalizada por IA
                    </span>

                    <h1 className="text-5xl lg:text-7xl font-bold mt-6 leading-tight">
                        Transforme sua alimentação com IA
                    </h1>

                    <p className="text-gray-600 mt-6 text-lg max-w-xl">
                        Receba recomendações alimentares criadas especialmente
                        para seu peso, objetivo e rotina.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link
                            href="/diagnostico"
                            className="cursor-pointer bg-emerald-400 text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-500 transition">
                            Criar Plano Grátis
                        </Link>

                        <a
                            href="#como-funciona"
                            className="
                            cursor-pointer
                            border
                            border-emerald-300
                            px-8
                            py-4
                            rounded-full
                            hover:bg-white
                            transition-all
                            duration-200
                            hover:scale-105
                            inline-block
                        "
                        >
                            Saiba Mais
                        </a>
                    </div>
                </div>

                <div
                    className="flex justify-center"
                >

                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-300 rounded-full opacity-30" />

                        <Image
                            src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg"
                            alt="Pessoa saudável"
                            width={450}
                            height={550}
                            className="relative z-10 rounded-[50px] object-cover"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}