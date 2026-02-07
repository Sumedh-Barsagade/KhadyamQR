import { motion } from "framer-motion";
import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      type: "tween" as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      type: "tween" as const,
    },
  },
};

const scaleOnHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

export default function Index() {
  const [exampleFromServer, setExampleFromServer] = useState("");
  useEffect(() => {
    // optional: ping server
    (async () => {
      try {
        const response = await fetch("/api/demo");
        const data = (await response.json()) as DemoResponse;
        setExampleFromServer(data.message);
      } catch {}
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="container h-14 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2 font-extrabold tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/khadyamqr-logo.svg"
            alt="KhadyamQR logo"
            className="h-8 w-8 rounded"
          />
          <span>KhadyamQR</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.a
            href="/restaurant-login"
            className="inline-flex h-9 items-center rounded-md border px-4 text-sm hover:bg-accent"
            whileHover={{ scale: 1.05 }}
          >
            Restaurant Login
          </motion.a>
          <motion.a
            href="/admin"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90"
            whileHover={{ scale: 1.05 }}
          >
            Admin
          </motion.a>
        </motion.div>
      </header>

      <main className="container py-16 grid gap-12">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            className="grid gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl lg:text-5xl font-extrabold leading-tight"
              variants={itemVariants}
            >
              Restaurant Menu QR System
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground"
              variants={itemVariants}
            >
              Create restaurants, upload menus with photos, and generate a
              persistent QR that always points to the live menu page. Built on
              Supabase. Deploy anywhere.
            </motion.p>

            <motion.div
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white shadow-lg"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
              }}
            >
              <div className="relative z-10">
                <motion.div
                  className="flex items-center gap-3 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-bold">
                    🚀 Transform Your Restaurant Menu
                  </h3>
                </motion.div>
                <motion.p
                  className="mb-4 text-emerald-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Upgrade to a{" "}
                  <span className="font-semibold text-white">
                    modern, contactless menu
                  </span>{" "}
                  experience with custom QR codes. No more reprinting menus -
                  update your offerings instantly!
                </motion.p>
                <motion.div
                  className="flex flex-wrap items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.a
                    href="tel:+918830778401"
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-600 shadow-md hover:bg-gray-100 transition-all hover:scale-105"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                    </svg>
                    Call Now: +91 88307 78401
                  </motion.a>
                  <motion.a
                    href="https://wa.me/918830778401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-emerald-700/80 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-all hover:scale-105"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.5 14.4l-2.3 1.1-1.4 1.4c-.2.1-.4.2-.6.2-.2 0-.5-.1-.7-.2l-3.2-2.5c-.3-.2-.5-.4-.6-.7 0-.2 0-.5.1-.7l1.4-1.4-1.1-2.3c-.3-.6-.1-1.3.5-1.7l2.5-1.4c.5-.3 1.1-.2 1.5.2l2.3 2.3c.2.2.5.3.8.3.3 0 .6-.1.8-.3l.5-.5c.9-.9 1.3-2.1 1.1-3.3-.2-1.2-1-2.2-2.1-2.7-1.5-.6-3.2-.7-4.7-.3-2.9.8-5.1 3.5-5.1 6.6 0 1.3.4 2.6 1.1 3.7l-1.1 2.3c-.3.6-.1 1.3.5 1.7l1.4.8c.2.1.4.2.6.2.2 0 .5-.1.7-.2l2.3-1.1c1.1.6 2.3.9 3.6.9 3.1 0 5.8-2.2 6.6-5.1.4-1.5.3-3.1-.3-4.5-.5-1.1-1.5-1.9-2.7-2.1-1.2-.2-2.3.2-3.2 1.1l-.5.5c-.1.1-.3.1-.4 0l-2.3-2.3c-.1-.1-.1-.3 0-.4l1.4-2.5c.4-.7 1.1-1 1.9-.8.7.2 1.3.6 1.7 1.1.4.5.7 1.1.8 1.8.1.7-.1 1.4-.5 2l-1.1 1.9c-.1.2-.1.4 0 .6l.8 1.7c.1.2.4.4.6.4.1 0 .2 0 .3-.1l2.3-1.1c.2-.1.4-.1.6 0 .2 0 .4.1.5.2.4.3.7.7.9 1.2.2.5.3 1 .2 1.5-.1.5-.4 1-.8 1.4-.4.4-.9.7-1.4.8z" />
                    </svg>
                    WhatsApp Us
                  </motion.a>
                </motion.div>
              </div>
              <motion.div
                className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-white/10"
                animate={floatingVariants.animate}
              />
              <motion.div
                className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5"
                animate={{
                  y: [0, 20, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    type: "tween" as const,
                  },
                }}
              />
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              <motion.a
                href="/restaurant-login"
                className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                {...scaleOnHover}
                whileTap={{ scale: 0.98 }}
              >
                Restaurant Login
              </motion.a>
              <motion.a
                href="/admin"
                className="inline-flex h-11 items-center rounded-md border px-6 hover:bg-accent"
                {...scaleOnHover}
                whileTap={{ scale: 0.98 }}
              >
                Admin Dashboard
              </motion.a>
            </motion.div>

            <motion.p
              className="text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <strong>Restaurant owners:</strong> Manage your menu •{" "}
              <strong>Admins:</strong> Manage all restaurants
            </motion.p>
            <motion.div
              className="text-xs text-muted-foreground"
              variants={itemVariants}
            >
              {exampleFromServer}
            </motion.div>
          </motion.div>

          <motion.div
            className="rounded-2xl border bg-white p-6 shadow-sm"
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            }}
            style={{ perspective: "1200px" }}
          >
            <motion.div
              className="grid gap-3"
              animate={floatingVariants.animate}
            >
              <div className="rounded-lg bg-emerald-100 h-40" />
              <div className="h-3 w-3/5 rounded bg-muted" />
              <div className="h-3 w-2/5 rounded bg-muted" />
              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  className="h-24 rounded bg-muted"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(209, 250, 229)",
                  }}
                />
                <motion.div
                  className="h-24 rounded bg-muted"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(209, 250, 229)",
                  }}
                />
                <motion.div
                  className="h-24 rounded bg-muted"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(209, 250, 229)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="grid gap-8">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to digitize your restaurant menu
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Create Restaurant",
                desc: "Set up your restaurant with logo",
              },
              {
                step: "2",
                title: "Add Menu Items",
                desc: "Upload photos and prices",
              },
              {
                step: "3",
                title: "Generate QR",
                desc: "Share your persistent QR code",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="rounded-xl border bg-card p-6 text-card-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="rounded-full w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-8">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your restaurant menu
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "📱",
                title: "QR Code Management",
                desc: "Generate and manage persistent QR codes",
              },
              {
                icon: "🖼️",
                title: "Photo Upload",
                desc: "High-quality menu item photos",
              },
              {
                icon: "💰",
                title: "Price Management",
                desc: "Easy price updates",
              },
              {
                icon: "🔄",
                title: "Real-time Updates",
                desc: "Changes reflect instantly",
              },
              {
                icon: "📊",
                title: "Analytics",
                desc: "Track QR code scans",
              },
              {
                icon: "🔐",
                title: "Secure Access",
                desc: "Restaurant owner login",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="rounded-xl border bg-card p-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Ready to Modernize Your Menu?</h2>
            <p className="text-muted-foreground text-lg">
              Contact us to get started with KhadyamQR
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/contact"
              className="inline-flex h-11 items-center rounded-md bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.a>
            <motion.a
              href="https://wa.me/918830778401"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-md border px-8 hover:bg-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              WhatsApp Us
            </motion.a>
          </div>
        </section>
      </main>
    </div>
  );
}
