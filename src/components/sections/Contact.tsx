import { useState } from "react";
import { motion } from "framer-motion";
import { Watermark } from "@/components/others/Watermark";

export default function Contact() {
  const [captcha, setCaptcha] = useState("7K9X2");
  const [inputCaptcha, setInputCaptcha] = useState("");

  function generateCaptcha() {
    setCaptcha(Math.random().toString(36).substring(2, 7).toUpperCase());
  }

  return (
    <section id="contact" className="relative w-full py-28 overflow-hidden">
      {/* BASE BACKGROUND */}
      <div className="absolute inset-0 -z-30 bg-linear-to-b from-background via-muted/20 to-background" />

      {/* WATERMARK (ANIMATED) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute inset-0 -z-20 pointer-events-none"
      >
        <Watermark />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium cursor-pointer">
            Fale com nosso time
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Vamos construir algo juntos
          </h2>

          <p className="text-muted-foreground leading-relaxed max-w-md">
            Entre em contato para conhecer melhor a Sipremo, explorar nossas
            soluções e entender como podemos apoiar sua operação com
            inteligência climática e tomada de decisão orientada por dados.
          </p>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="cursor-pointer">✔ Atendimento consultivo</p>
            <p className="cursor-pointer">✔ Demonstração da plataforma</p>
            <p className="cursor-pointer">
              ✔ Soluções sob medida para sua empresa
            </p>
          </div>
        </motion.div>

        {/* RIGHT SIDE - FORM */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-background border border-border rounded-xl shadow-xl p-8 relative backdrop-blur-sm"
        >
          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm mb-1 block">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-text"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-text"
              />
            </div>

            {/* Company */}
            <div>
              <label className="text-sm mb-1 block">Empresa</label>
              <input
                type="text"
                placeholder="Nome da empresa"
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-text"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm mb-1 block">Mensagem</label>
              <textarea
                rows={4}
                placeholder="Descreva sua necessidade..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none cursor-text"
              />
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <label className="text-sm block">Captcha</label>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-muted/50 border border-border rounded-lg tracking-widest font-mono text-lg select-none cursor-default">
                  {captcha}
                </div>

                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  Atualizar
                </button>
              </div>

              <input
                type="text"
                placeholder="Digite o captcha"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-text"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition cursor-pointer"
            >
              Enviar mensagem
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Seus dados serão usados apenas para retorno de contato.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
