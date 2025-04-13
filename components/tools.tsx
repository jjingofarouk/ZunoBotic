"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Tools() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const hardwareTools = [
    {
      name: "Arduino",
      description: "Open-source microcontroller platform ideal for beginners and advanced users alike.",
      icon: "🔌",
    },
    {
      name: "Raspberry Pi",
      description: "Single-board computer providing more computing power for complex processing.",
      icon: "💻",
    },
    {
      name: "STM32",
      description: "Microcontrollers for deeper embedded systems work or higher performance.",
      icon: "🎛️",
    },
    {
      name: "3D Printers",
      description: "On-site printers for rapid prototyping of robot parts and enclosures.",
      icon: "🖨️",
    },
  ]

  const softwareTools = [
    {
      name: "Robot Operating System (ROS)",
      description: "Open-source middleware for complex robotics projects.",
      icon: "🤖",
    },
    {
      name: "OpenCV",
      description: "Computer vision library for image processing and machine learning.",
      icon: "👁️",
    },
    {
      name: "FreeCAD & Blender",
      description: "Open-source 3D design and simulation tools.",
      icon: "🎮",
    },
    {
      name: "Git & GitHub",
      description: "Version control and collaboration platforms for code sharing.",
      icon: "📊",
    },
  ]

  return (
    <section id="tools" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Tools & Technologies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide access to a wide range of open-source tools and platforms for robotics and automation.
          </p>
        </motion.div>

        <Tabs defaultValue="hardware" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-blue-50 p-1 rounded-full">
            <TabsTrigger
              value="hardware"
              className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Hardware
            </TabsTrigger>
            <TabsTrigger
              value="software"
              className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Software
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hardware">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hardwareTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeIn}
                >
                  <div className="bg-blue-50 p-8 rounded-lg h-full">
                    <div className="text-5xl mb-6">{tool.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-blue-600">{tool.name}</h3>
                    <p className="text-gray-600">{tool.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="software">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {softwareTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeIn}
                >
                  <div className="bg-blue-50 p-8 rounded-lg h-full">
                    <div className="text-5xl mb-6">{tool.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-blue-600">{tool.name}</h3>
                    <p className="text-gray-600">{tool.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
