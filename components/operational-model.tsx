"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function OperationalModel() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const steps = [
    {
      title: "Application & Project Selection",
      description:
        "Students submit project proposals that are reviewed based on relevance, feasibility, and educational value.",
    },
    {
      title: "Support & Resource Allocation",
      description: "Approved teams gain access to hardware components, tools, workspace, and mentorship.",
    },
    {
      title: "Open-Source Compliance",
      description: "All projects must maintain public repositories with code, schematics, and documentation.",
    },
    {
      title: "Collaborative Development",
      description:
        "Teams collaborate, share progress, and contribute to a growing ecosystem of open-source innovation.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our operational model is designed to support students while ensuring open-source development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeIn}
            className="relative"
          >
            <div className="absolute -inset-4 bg-emerald-200 rounded-3xl transform rotate-3 opacity-50"></div>
            <div className="absolute -inset-4 bg-emerald-300 rounded-3xl transform -rotate-2 opacity-30"></div>
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Students working on robotics project"
              className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 z-20">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium">Project in progress</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="absolute top-12 left-1/2 w-0.5 h-16 bg-emerald-200 -translate-x-1/2"></div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
