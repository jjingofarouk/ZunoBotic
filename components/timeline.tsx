"use client"

import { motion } from "framer-motion"

export default function Timeline() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const timelineItems = [
    {
      year: "2025",
      title: "Pilot at Makerere and Kyambogo Universities",
      description: "Establish initial presence, set up small labs, recruit mentors, and begin outreach.",
      align: "right",
    },
    {
      year: "Late 2025",
      title: "Evaluation and Adjustment",
      description: "Assess pilot success, gather feedback, and refine processes based on lessons learned.",
      align: "left",
    },
    {
      year: "2026",
      title: "Expansion to More Ugandan Universities",
      description: "Expand to other Ugandan universities and technical institutes.",
      align: "right",
    },
    {
      year: "2027",
      title: "Regional Outreach to Rwanda and East Africa",
      description: "Extend to neighboring countries, starting with Rwanda.",
      align: "left",
    },
  ]

  return (
    <section className="py-24 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Launch Timeline</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ZunoBotics will roll out in phases, starting in Uganda and gradually expanding regionally.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>

          {/* Timeline items */}
          <div className="relative">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                variants={fadeIn}
                className={`flex items-center mb-16 ${item.align === "left" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-1/2 ${item.align === "left" ? "pr-12 text-right" : "pl-12"}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                    {item.year.includes("-") ? item.year.split("-")[0] : item.year}
                  </div>
                </div>

                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
