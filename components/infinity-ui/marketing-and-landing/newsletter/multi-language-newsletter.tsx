"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight, CheckCircle, Mail, Globe, ChevronDown } from "lucide-react"

const MultiLanguageNewsletter = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [language, setLanguage] = useState("en")
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  const selectLanguage = (code: string) => {
    setLanguage(code)
    setIsLanguageMenuOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  // Content translations
  const translations = {
    en: {
      badge: "Global Newsletter",
      title: "Subscribe to our multi-language newsletter",
      description: "Get the latest updates in your preferred language, delivered straight to your inbox.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      submitButton: "Subscribe",
      privacyText: "We respect your privacy. Unsubscribe at any time.",
      successTitle: "Thank you for subscribing!",
      successMessage: "We've sent a confirmation email to",
      features: ["Content in your language", "Global perspectives", "Cultural insights"],
    },
    es: {
      badge: "Boletín Global",
      title: "Suscríbete a nuestro boletín multilingüe",
      description: "Recibe las últimas actualizaciones en tu idioma preferido, directamente en tu bandeja de entrada.",
      namePlaceholder: "Tu Nombre",
      emailPlaceholder: "Tu Email",
      submitButton: "Suscribirse",
      privacyText: "Respetamos tu privacidad. Cancela la suscripción en cualquier momento.",
      successTitle: "¡Gracias por suscribirte!",
      successMessage: "Hemos enviado un correo de confirmación a",
      features: ["Contenido en tu idioma", "Perspectivas globales", "Conocimientos culturales"],
    },
    fr: {
      badge: "Newsletter Mondiale",
      title: "Abonnez-vous à notre newsletter multilingue",
      description:
        "Recevez les dernières mises à jour dans votre langue préférée, directement dans votre boîte de réception.",
      namePlaceholder: "Votre Nom",
      emailPlaceholder: "Votre Email",
      submitButton: "S'abonner",
      privacyText: "Nous respectons votre vie privée. Désabonnez-vous à tout moment.",
      successTitle: "Merci de vous être abonné !",
      successMessage: "Nous avons envoyé un email de confirmation à",
      features: ["Contenu dans votre langue", "Perspectives mondiales", "Connaissances culturelles"],
    },
    de: {
      badge: "Globaler Newsletter",
      title: "Abonnieren Sie unseren mehrsprachigen Newsletter",
      description: "Erhalten Sie die neuesten Updates in Ihrer bevorzugten Sprache direkt in Ihrem Posteingang.",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "Ihre E-Mail",
      submitButton: "Abonnieren",
      privacyText: "Wir respektieren Ihre Privatsphäre. Abmeldung jederzeit möglich.",
      successTitle: "Vielen Dank für Ihr Abonnement!",
      successMessage: "Wir haben eine Bestätigungs-E-Mail gesendet an",
      features: ["Inhalte in Ihrer Sprache", "Globale Perspektiven", "Kulturelle Einblicke"],
    },
    zh: {
      badge: "全球通讯",
      title: "订阅我们的多语言通讯",
      description: "以您喜欢的语言获取最新更新，直接发送到您的收件箱。",
      namePlaceholder: "您的姓名",
      emailPlaceholder: "您的电子邮件",
      submitButton: "订阅",
      privacyText: "我们尊重您的隐私。随时取消订阅。",
      successTitle: "感谢您的订阅！",
      successMessage: "我们已向以下地址发送确认电子邮件",
      features: ["您语言的内容", "全球视角", "文化洞察"],
    },
    ja: {
      badge: "グローバルニュースレター",
      title: "多言語ニュースレターを購読する",
      description: "お好みの言語で最新情報を受け取り、受信トレイに直接配信されます。",
      namePlaceholder: "お名前",
      emailPlaceholder: "メールアドレス",
      submitButton: "購読する",
      privacyText: "私たちはあなたのプライバシーを尊重します。いつでも購読を解除できます。",
      successTitle: "ご購読ありがとうございます！",
      successMessage: "確認メールを送信しました",
      features: ["あなたの言語でのコンテンツ", "グローバルな視点", "文化的な洞察"],
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  return (
    <section className="w-full py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex justify-end mb-6">
          <div className="relative">
            <button
              onClick={toggleLanguageMenu}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
                <div className="py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-blue-50 transition-colors ${
                        lang.code === language ? "bg-blue-50 text-blue-600" : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
              <Globe className="w-4 h-4 mr-2" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">{t.title}</h2>

            <p className="text-gray-600 mb-8 text-lg max-w-xl">{t.description}</p>

            <div className="space-y-4 mb-8">
              {t.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Language flags */}
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                    lang.code === language ? "bg-blue-100 shadow-sm" : "hover:bg-gray-100"
                  }`}
                  aria-label={`Switch to ${lang.name}`}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50"
                >
                  <Mail className="h-8 w-8 text-blue-600" />
                </motion.div>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      {t.namePlaceholder}
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-colors text-gray-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="multi-lang-email" className="block text-sm font-medium text-gray-700">
                      {t.emailPlaceholder}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="multi-lang-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 transition-colors text-gray-800"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <span>{t.submitButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 p-6 rounded-xl border border-green-100 flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">{t.successTitle}</h4>
                    <p className="text-green-700">
                      {t.successMessage} <span className="font-medium">{email}</span>
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>{t.privacyText}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MultiLanguageNewsletter

