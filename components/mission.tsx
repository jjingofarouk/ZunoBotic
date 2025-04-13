"use client"

import { motion } from "framer-motion"

export default function Mission() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="mission" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-50 text-blue-600 font-medium text-sm">
            Our Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Vision & Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ZunoBotics is a robotics and automation open-source innovation hub launching in Uganda in 2025. Our vision
            is to democratize innovation by making robotics and automation technology accessible to students and young
            innovators across Africa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeIn}
            className="bg-gray-50 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Democratize Innovation</h3>
            <p className="text-gray-600">
              Making robotics and automation technology accessible to students and young innovators across Africa,
              breaking down financial and technical barriers.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="bg-gray-50 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Build Community</h3>
            <p className="text-gray-600">
              Creating a growing ecosystem of shared knowledge and accessible innovation in Africa, where students
              collaborate and learn from each other.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={fadeIn}
            className="bg-gray-50 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Open Source Everything</h3>
            <p className="text-gray-600">
              All projects are open-sourced, allowing anyone to learn from and build upon previous work, creating a
              repository of African-made robotics solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
