// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://github.com/ThotifyDoc/thotify",
  base: "/thotify/", // Nom du repository GitHub
  integrations: [
    starlight({
      title: "Thotify",
      customCss: ["./src/assets/style/style.css"],
      social: {
        github: "https://github.com/ThotifyDoc/thotify",
      },

      sidebar: [
        {
          label: "Home",
          collapsed: true,
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Sommaire",
              slug: "home/summary",
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
          ],
        },
        {
          label: "Golang",
          collapsed: true,
          items: [
            {
              label: "Introduction",
              slug: "golang/intro",
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
          ],
        },
        {
          label: "Minio Client",
          collapsed: true,
          items: [
            {
              label: "Introduction",
              slug: "minio/getstarted",
            },
            {
              label: "Cheat Sheet",
              slug: "minio/cheatsheet",
            },
            {
              label: "Crédits",
              slug: "minio/credentials",
            },
          ],
          badge: {
            text: "Nouveau",
            class: "badge-new",
          },
        },
        {
          label: "VM, Shell et Linux",
          collapsed: true,
          items: [
            {
              label: "Virtualisation OS",
              slug: "vm-shell-linux/virtualisation",
            },
            {
              label: "Commandes Linux",
              slug: "vm-shell-linux/commands",
            },
            {
              label: "Hardware",
              slug: "vm-shell-linux/hardware",
            },
            {
              label: "Crédits",
              slug: "vm-shell-linux/credentials",
            },
          ],
          badge: {
            text: "In progress",
            class: "badge-in-progress",
          },
        },
        {
          label: "Docker",
          collapsed: true,
          items: [
            {
              label: "Debug",
              slug: "docker/debug",
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
          ],
        },
        {
          label: "Kubernetes",
          collapsed: true,
          items: [
            {
              label: "Debug",
              slug: "kubernetes/cheatsheet",
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
            {
              label: "Getting started",
              slug: "kubernetes/gettingstarted",
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
            {
              label: "CoreConcepts",
              slug: "kubernetes/coreconcepts",
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
          ],
        },
        {
          label: "Culture G",
          collapsed: true,
          items: [
            {
              label: "Compiler vs Interpreter",
              slug: "culture/compiler-interpreter",
              
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
            {
              label: "Languages paradigm",
              slug: "culture/languages-paradigm",
              
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
            {
              label: "Languages performance",
              slug: "culture/languages-performances",
              
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            },
            {
              label: "Crédits",
              slug: "culture/credentials",
            },
          ],
        },
        {
          label: "Python",
          collapsed: true,
          items: [
            {
              label: "Array Structure",
              slug: "python/array",
              
              badge: {
                text: "In progress",
                class: "badge-in-progress",
              },
            }
          ],
        },
      ],
    }),
  ],
});
