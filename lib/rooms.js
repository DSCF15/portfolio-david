import { certifications } from "./content";

// Salas do Command Center, pela ordem em que aparecem.
export const rooms = [
  { id: "identidade", label: "Identidade", key: "1" },
  { id: "skills", label: "Skills", key: "2" },
  { id: "percurso", label: "Percurso", key: "3" },
  { id: "projetos", label: "Projetos", key: "4" },
  ...(certifications.length ? [{ id: "certificacoes", label: "Certificações", key: "5" }] : []),
  { id: "contacto", label: "Contacto", key: certifications.length ? "6" : "5" },
];
