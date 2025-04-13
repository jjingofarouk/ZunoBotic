"use client"

import { motion } from "framer-motion"

export default function Partners() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const partners = [
    { name: "Makerere University", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Kyambogo University", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Uganda Martyrs University", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Mbarara University", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Tech Partner", logo: "/placeholder.svg?height=80&width=160" },
    { name: "Innovation Hub", logo: "/placeholder.svg?height=80&width=160" },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with universities, tech communities, and organizations to maximize our impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
              className="flex items-center justify-center"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-h-16 grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
