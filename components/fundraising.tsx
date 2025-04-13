"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Heart, Building, GraduationCap, Users, Mail, Phone } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Fundraising() {
  const [donationAmount, setDonationAmount] = useState(50)
  const [selectedAmount, setSelectedAmount] = useState(50)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const donationOptions = [
    { value: 25, label: "$25" },
    { value: 50, label: "$50" },
    { value: 100, label: "$100" },
    { value: 200, label: "$200" },
  ]

  const donationTiers = [
    {
      name: "Supporter",
      range: "$25 - $499",
      description: "Help us provide basic components and tools for student projects.",
      benefits: ["Recognition on our website", "Project updates newsletter"],
    },
    {
      name: "Innovator",
      range: "$500 - $2,499",
      description: "Fund a complete student project from concept to prototype.",
      benefits: ["All Supporter benefits", "Annual impact report", "Invitation to virtual showcase events"],
    },
    {
      name: "Pioneer",
      range: "$2,500 - $9,999",
      description: "Help us expand to a new university or technical institute.",
      benefits: [
        "All Innovator benefits",
        "Named recognition on funded projects",
        "Exclusive behind-the-scenes updates",
      ],
    },
    {
      name: "Visionary",
      range: "$10,000+",
      description: "Establish a fully equipped innovation lab at a partner university.",
      benefits: [
        "All Pioneer benefits",
        "Naming opportunity for lab space",
        "Annual in-person visit and demonstration",
        "Strategic advisory role",
      ],
    },
  ]

  const handleDonationChange = (value: number[]) => {
    setDonationAmount(value[0])
    setSelectedAmount(value[0])
  }

  const handleOptionClick = (value: number) => {
    setSelectedAmount(value)
    setDonationAmount(value)
  }

  // Fundraising progress data
  const raised = 15000
  const goal = 50000
  const progressPercentage = (raised / goal) * 100

  const supportOptions = [
    {
      title: "Corporate Sponsorship",
      description: "Become a corporate partner with brand visibility and talent nurturing opportunities.",
      icon: <Building className="h-6 w-6 text-blue-500" />,
      badge: "Enterprise",
      contact: "partnerships@zunobotics.org",
    },
    {
      title: "Educational Partnership",
      description: "Partner with us as an educational institution to expand our reach.",
      icon: <GraduationCap className="h-6 w-6 text-blue-500" />,
      badge: "Education",
      contact: "education@zunobotics.org",
    },
    {
      title: "Volunteer",
      description: "Share your skills and time to help us grow our community.",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      badge: "Community",
      contact: "volunteer@zunobotics.org",
    },
  ]

  return (
    <section id="support" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-900 text-blue-300 font-medium text-sm">
            Support Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Support Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us democratize innovation across Africa. Your contribution powers our labs, provides components to
            students, and helps us expand to new universities.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16">
          <Tabs defaultValue="donate" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-gray-800 p-1 rounded-full">
              <TabsTrigger
                value="donate"
                className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                One-time Donation
              </TabsTrigger>
              <TabsTrigger
                value="tiers"
                className="rounded-full py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Donation Tiers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="donate">
              <Card className="bg-gray-800 border-none text-white">
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-2xl font-bold mb-6">Donate</h3>

                  {/* Fundraising progress */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-lg font-medium">${(raised / 1000).toFixed(0)}K raised</span>
                      <span className="text-lg font-medium">${(goal / 1000).toFixed(0)}K goal</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 bg-gray-700" indicatorClassName="bg-blue-500" />
                    <p className="text-gray-400 mt-2 text-sm">{progressPercentage.toFixed(0)}% of our goal reached</p>
                  </div>

                  <div className="mb-8">
                    <p className="mb-4 text-gray-300">Donation Amount (USD)</p>
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      {donationOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleOptionClick(option.value)}
                          className={`py-3 rounded-md transition-colors ${
                            selectedAmount === option.value
                              ? "bg-blue-500 text-white"
                              : "bg-gray-700 text-white hover:bg-gray-600"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    <div className="mb-2">
                      <Slider
                        defaultValue={[50]}
                        min={10}
                        max={500}
                        step={5}
                        value={[donationAmount]}
                        onValueChange={handleDonationChange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>$10</span>
                        <span>$500</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-500 hover:bg-blue-600 py-6 text-lg text-white">
                    Donate ${selectedAmount} <Heart className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-center text-gray-400 mt-6">
                    Your donation helps supply components, run workshops, and expand to more universities.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tiers">
              <div className="grid md:grid-cols-2 gap-6">
                {donationTiers.map((tier, index) => (
                  <Card key={index} className="bg-gray-800 border-none text-white">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{tier.name}</h3>
                        <Badge className="bg-blue-600 hover:bg-blue-700">{tier.range}</Badge>
                      </div>
                      <p className="text-gray-300 mb-4">{tier.description}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2 text-blue-300">Benefits:</h4>
                        <ul className="space-y-1">
                          {tier.benefits.map((benefit, i) => (
                            <li key={i} className="text-gray-300 text-sm flex items-start">
                              <span className="text-blue-400 mr-2">•</span> {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-6">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Donate as {tier.name}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <h3 className="text-3xl font-bold mb-8">Other Ways to Support</h3>

        <div className="grid md:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <Card className="bg-gray-800 border-none text-white h-full flex flex-col">
                <CardContent className="pt-8 pb-4 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="rounded-full bg-gray-700 p-4 w-16 h-16 flex items-center justify-center">
                      {option.icon}
                    </div>
                    <Badge className="bg-blue-900 hover:bg-blue-800 text-blue-100">{option.badge}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                  <p className="text-gray-300 mb-4">{option.description}</p>
                </CardContent>
                <CardFooter className="pt-0 pb-6 flex flex-col space-y-3">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" /> Contact via Email
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" /> Schedule a Call
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
