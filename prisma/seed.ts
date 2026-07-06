// ──────────────────────────────────────────────────────────────────────────────
// SEED — Datos de prueba realistas para el Sistema de Egresados UNA Puno
//
// Ejecutar con: npm run seed
// ──────────────────────────────────────────────────────────────────────────────

import { PrismaClient, Role, EmploymentStatus, JobType } from "../src/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Iniciando seed de la base de datos UNA Puno...\n")

  const adminPassword       = await bcrypt.hash("admin123",       10)
  const graduatePassword    = await bcrypt.hash("password123",    10)
  const directorPassword    = await bcrypt.hash("director123",    10)
  const coordinadorPassword = await bcrypt.hash("coordinador123", 10)

  // Limpiar tablas en orden (respetando foreign keys)
  await prisma.surveyAnswer.deleteMany()
  await prisma.surveyResponse.deleteMany()
  await prisma.surveyQuestion.deleteMany()
  await prisma.survey.deleteMany()
  await prisma.jobApplication.deleteMany()
  await prisma.jobClick.deleteMany()
  await prisma.jobOffer.deleteMany()
  await prisma.company.deleteMany()
  await prisma.workExperience.deleteMany()
  await prisma.graduate.deleteMany()
  await prisma.school.deleteMany()
  await prisma.faculty.deleteMany()
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()

  console.log("✓ Tablas limpias\n")

  // ─── 1. FACULTADES ────────────────────────────────────────────────────────
  console.log("→ Creando facultades...")

  const [facIngenieria, facContables, facEducacion, facSociales] =
    await Promise.all([
      prisma.faculty.create({
        data: {
          name: "Facultad de Ingeniería y Ciencias Puras",
          code: "FICP",
        },
      }),
      prisma.faculty.create({
        data: {
          name: "Facultad de Ciencias Contables y Administrativas",
          code: "FCCA",
        },
      }),
      prisma.faculty.create({
        data: {
          name: "Facultad de Ciencias de la Educación",
          code: "FCE",
        },
      }),
      prisma.faculty.create({
        data: {
          name: "Facultad de Ciencias Sociales",
          code: "FCS",
        },
      }),
    ])

  console.log("  ✓ 4 facultades creadas")

  // ─── 2. ESCUELAS PROFESIONALES ────────────────────────────────────────────
  console.log("→ Creando escuelas profesionales...")

  const [
    escSistemas,
    escCivil,
    escContabilidad,
    escAdministracion,
    escEducacionPrimaria,
    escTrabSocial,
  ] = await Promise.all([
    prisma.school.create({
      data: {
        name: "Ingeniería de Sistemas",
        code: "IS",
        facultyId: facIngenieria.id,
      },
    }),
    prisma.school.create({
      data: {
        name: "Ingeniería Civil",
        code: "IC",
        facultyId: facIngenieria.id,
      },
    }),
    prisma.school.create({
      data: {
        name: "Contabilidad",
        code: "CONT",
        facultyId: facContables.id,
      },
    }),
    prisma.school.create({
      data: {
        name: "Administración de Empresas",
        code: "ADE",
        facultyId: facContables.id,
      },
    }),
    prisma.school.create({
      data: {
        name: "Educación Primaria",
        code: "EP",
        facultyId: facEducacion.id,
      },
    }),
    prisma.school.create({
      data: {
        name: "Trabajo Social",
        code: "TS",
        facultyId: facSociales.id,
      },
    }),
  ])

  console.log("  ✓ 6 escuelas profesionales creadas")

  // ─── 3. USUARIOS Y EGRESADOS ──────────────────────────────────────────────
  console.log("→ Creando usuarios y egresados...")

  // Usuario administrador
  const adminUser = await prisma.user.create({
    data: {
      email:    "admin@unap.edu.pe",
      password: adminPassword,
      role:     Role.ADMIN,
    },
  })

  // Usuario Director de Escuela Profesional
  await prisma.user.create({
    data: {
      email:    "director@epis.edu.pe",
      password: directorPassword,
      role:     Role.DIRECTOR,
    },
  })

  // Usuario Coordinador de Prácticas Profesionales
  await prisma.user.create({
    data: {
      email:    "coordinador@epis.edu.pe",
      password: coordinadorPassword,
      role:     Role.PRACTICE_COORDINATOR,
    },
  })

  // Datos de egresados (nombres típicos de la región Puno)
  const graduatesData = [
    {
      email: "juan.mamani@gmail.com",
      firstName: "Juan Carlos",
      lastName: "Mamani Quispe",
      dni: "44521803",
      phone: "951234567",
      birthDate: new Date("1998-03-15"),
      graduationYear: 2021,
      degree: "Ingeniero de Sistemas",
      schoolId: escSistemas.id,
      employmentStatus: EmploymentStatus.EMPLOYED,
      currentPosition: "Desarrollador Full Stack",
      currentCompany: "Tech Solutions SAC",
      city: "Lima",
      bio: "Egresado de Ingeniería de Sistemas con experiencia en desarrollo web y móvil.",
      linkedinUrl: "https://linkedin.com/in/juan-mamani",
    },
    {
      email: "maria.quispe@gmail.com",
      firstName: "María Elena",
      lastName: "Quispe Condori",
      dni: "45832910",
      phone: "952345678",
      birthDate: new Date("1999-07-22"),
      graduationYear: 2022,
      degree: "Ingeniera de Sistemas",
      schoolId: escSistemas.id,
      employmentStatus: EmploymentStatus.EMPLOYED,
      currentPosition: "Analista de Datos",
      currentCompany: "Gobierno Regional Puno",
      city: "Puno",
      bio: "Especializada en análisis de datos e inteligencia de negocios.",
    },
    {
      email: "pedro.huanca@gmail.com",
      firstName: "Pedro Alberto",
      lastName: "Huanca Flores",
      dni: "46123784",
      phone: "953456789",
      birthDate: new Date("1997-11-08"),
      graduationYear: 2020,
      degree: "Ingeniero Civil",
      schoolId: escCivil.id,
      employmentStatus: EmploymentStatus.EMPLOYED,
      currentPosition: "Supervisor de Obras",
      currentCompany: "Constructora Andina SRL",
      city: "Juliaca",
      bio: "Especialista en gestión de proyectos de construcción y supervisión.",
    },
    {
      email: "rosa.coila@gmail.com",
      firstName: "Rosa Inés",
      lastName: "Coila Apaza",
      dni: "47234895",
      phone: "954567890",
      birthDate: new Date("2000-02-14"),
      graduationYear: 2023,
      degree: "Contadora Pública",
      schoolId: escContabilidad.id,
      employmentStatus: EmploymentStatus.SEEKING,
      city: "Puno",
      bio: "Recién egresada, buscando mi primera oportunidad profesional en auditoría.",
    },
    {
      email: "carlos.lupaca@gmail.com",
      firstName: "Carlos Efraín",
      lastName: "Lupaca Mamani",
      dni: "48345906",
      phone: "955678901",
      birthDate: new Date("1996-06-30"),
      graduationYear: 2019,
      degree: "Administrador de Empresas",
      schoolId: escAdministracion.id,
      employmentStatus: EmploymentStatus.SELF_EMPLOYED,
      currentPosition: "Gerente General",
      currentCompany: "Inversiones Lupaca EIRL",
      city: "Juliaca",
      bio: "Emprendedor con negocio propio en el rubro comercial desde el 2020.",
    },
    {
      email: "lucia.ccama@gmail.com",
      firstName: "Lucía Beatriz",
      lastName: "Ccama Vargas",
      dni: "49456017",
      phone: "956789012",
      birthDate: new Date("1999-09-05"),
      graduationYear: 2022,
      degree: "Licenciada en Educación Primaria",
      schoolId: escEducacionPrimaria.id,
      employmentStatus: EmploymentStatus.EMPLOYED,
      currentPosition: "Docente de Primaria",
      currentCompany: "I.E. 70548 San Juan Bosco",
      city: "Puno",
      bio: "Docente comprometida con la educación rural e intercultural bilingüe.",
    },
    {
      email: "felix.ramos@gmail.com",
      firstName: "Félix Augusto",
      lastName: "Ramos Tito",
      dni: "50567128",
      phone: "957890123",
      birthDate: new Date("1998-04-18"),
      graduationYear: 2021,
      degree: "Ingeniero de Sistemas",
      schoolId: escSistemas.id,
      employmentStatus: EmploymentStatus.STUDYING,
      city: "Lima",
      bio: "Cursando maestría en Inteligencia Artificial en la PUCP.",
    },
    {
      email: "ana.velasquez@gmail.com",
      firstName: "Ana Patricia",
      lastName: "Velásquez Cruz",
      dni: "51678239",
      phone: "958901234",
      birthDate: new Date("2000-12-01"),
      graduationYear: 2023,
      degree: "Licenciada en Trabajo Social",
      schoolId: escTrabSocial.id,
      employmentStatus: EmploymentStatus.EMPLOYED,
      currentPosition: "Asistenta Social",
      currentCompany: "Municipalidad Provincial de Puno",
      city: "Puno",
      bio: "Orientada al servicio social y el bienestar de las comunidades.",
    },
  ]

  const graduates = []
  for (const data of graduatesData) {
    const { email, schoolId, ...graduateFields } = data
    const user = await prisma.user.create({
      data: {
        email,
        password: graduatePassword,
        role: Role.GRADUATE,
        graduate: {
          create: {
            schoolId,
            ...graduateFields,
          },
        },
      },
      include: { graduate: true },
    })
    graduates.push(user.graduate!)
  }

  console.log(`  ✓ 1 admin + 1 director + 1 coordinador + ${graduates.length} egresados creados`)

  // ─── 4. EXPERIENCIA LABORAL ───────────────────────────────────────────────
  console.log("→ Creando experiencias laborales...")

  await prisma.workExperience.createMany({
    data: [
      // Juan Mamani — 2 experiencias
      {
        graduateId: graduates[0].id,
        company: "Startup Digital SAC",
        position: "Desarrollador Junior",
        startDate: new Date("2021-08-01"),
        endDate: new Date("2022-12-31"),
        isCurrent: false,
        description: "Desarrollo de aplicaciones web con React y Node.js",
        location: "Lima (Remoto)",
      },
      {
        graduateId: graduates[0].id,
        company: "Tech Solutions SAC",
        position: "Desarrollador Full Stack",
        startDate: new Date("2023-01-15"),
        endDate: null,
        isCurrent: true,
        description: "Desarrollo de sistemas empresariales con Next.js y PostgreSQL",
        location: "Lima",
      },
      // María Quispe — 1 experiencia
      {
        graduateId: graduates[1].id,
        company: "Gobierno Regional Puno",
        position: "Analista de Datos",
        startDate: new Date("2022-06-01"),
        endDate: null,
        isCurrent: true,
        description: "Análisis de datos estadísticos y reportes de gestión pública",
        location: "Puno",
      },
      // Pedro Huanca — 2 experiencias
      {
        graduateId: graduates[2].id,
        company: "Constructora del Sur SAC",
        position: "Asistente de Ingeniería",
        startDate: new Date("2020-07-01"),
        endDate: new Date("2022-03-31"),
        isCurrent: false,
        description: "Supervisión de obras civiles y elaboración de metrados",
        location: "Juliaca",
      },
      {
        graduateId: graduates[2].id,
        company: "Constructora Andina SRL",
        position: "Supervisor de Obras",
        startDate: new Date("2022-04-15"),
        endDate: null,
        isCurrent: true,
        description: "Supervisión integral de proyectos de construcción",
        location: "Juliaca",
      },
      // Carlos Lupaca — 1 experiencia
      {
        graduateId: graduates[4].id,
        company: "Inversiones Lupaca EIRL",
        position: "Gerente General",
        startDate: new Date("2020-03-01"),
        endDate: null,
        isCurrent: true,
        description: "Dirección y gestión de empresa comercial familiar",
        location: "Juliaca",
      },
    ],
  })

  console.log("  ✓ Experiencias laborales creadas")

  // ─── 5. EMPRESAS ──────────────────────────────────────────────────────────
  console.log("→ Creando empresas...")

  const [empresaTech, empresaGobierno, empresaMinera] = await Promise.all([
    prisma.company.create({
      data: {
        name: "Tech Solutions SAC",
        ruc: "20601234567",
        sector: "Tecnología de la Información",
        website: "https://techsolutions.pe",
        description: "Empresa de desarrollo de software y consultoría TI",
        isVerified: true,
      },
    }),
    prisma.company.create({
      data: {
        name: "Gobierno Regional Puno",
        ruc: "20401234560",
        sector: "Sector Público",
        website: "https://regionpuno.gob.pe",
        description: "Gobierno Regional de Puno — Gerencia Regional de Infraestructura",
        isVerified: true,
      },
    }),
    prisma.company.create({
      data: {
        name: "Aruntani SAC",
        ruc: "20100234567",
        sector: "Minería y Construcción",
        website: "https://aruntani.com",
        description: "Empresa minera con operaciones en la región sur del Perú",
        isVerified: true,
      },
    }),
  ])

  console.log("  ✓ 3 empresas creadas")

  // ─── 6. OFERTAS LABORALES ─────────────────────────────────────────────────
  console.log("→ Creando ofertas laborales...")

  const [ofertaSistemas, ofertaDatos, ofertaCivil] = await Promise.all([
    prisma.jobOffer.create({
      data: {
        companyId:   empresaTech.id,
        title:       "Desarrollador Full Stack Junior",
        description:
          "Buscamos desarrollador con conocimientos en React, Node.js y bases de datos relacionales. Trabajará en proyectos de digitalización para clientes del sector público y privado.",
        requirements:
          "- Egresado de Ingeniería de Sistemas o carrera afín\n- Conocimiento de React, Next.js, Node.js\n- Manejo de PostgreSQL o MySQL\n- Inglés básico-intermedio",
        location:    "Lima",
        type:        JobType.FULL_TIME,
        modality:    "HYBRID",
        salary:      "S/. 2,800 - 4,000",
        isRemote:    false,
        isActive:    true,
        externalUrl: "https://techsolutions.pe/empleos/fullstack-junior",
        expiresAt:   new Date("2026-06-30"),
      },
    }),
    prisma.jobOffer.create({
      data: {
        companyId:   empresaGobierno.id,
        title:       "Analista de Sistemas de Información",
        description:
          "Se requiere profesional para análisis y gestión de sistemas de información institucionales. Apoyo en digitalización de procesos administrativos del gobierno regional.",
        requirements:
          "- Egresado de Ingeniería de Sistemas o Informática\n- Experiencia mínima 1 año en sector público (deseable)\n- Conocimiento de Power BI o herramientas de BI\n- Dominio de Excel avanzado",
        location:  "Puno",
        type:      JobType.CONTRACT,
        modality:  "PRESENTIAL",
        salary:    "S/. 3,500",
        isRemote:  false,
        isActive:  true,
        expiresAt: new Date("2026-07-31"),
      },
    }),
    prisma.jobOffer.create({
      data: {
        companyId:   empresaMinera.id,
        title:       "Ingeniero Civil — Obras de Infraestructura",
        description:
          "Empresa minera requiere ingeniero civil para supervisión de obras de infraestructura en zona de operaciones. Incluye alojamiento y alimentación en campamento.",
        requirements:
          "- Egresado de Ingeniería Civil\n- Experiencia mínima 2 años en obras civiles\n- Disponibilidad para residir en campamento\n- Licencia de conducir categoría A1",
        location:    "Moquegua (Campamento)",
        type:        JobType.FULL_TIME,
        modality:    "PRESENTIAL",
        salary:      "S/. 5,000 - 7,000",
        isRemote:    false,
        isActive:    true,
        externalUrl: "https://aruntani.com/convocatorias",
        expiresAt:   new Date("2026-07-15"),
      },
    }),
  ])

  console.log("  ✓ 3 ofertas laborales creadas")

  // ─── 7. POSTULACIONES ─────────────────────────────────────────────────────
  console.log("→ Creando postulaciones...")

  await prisma.jobApplication.createMany({
    data: [
      {
        jobId: ofertaSistemas.id,
        graduateId: graduates[0].id, // Juan → Systems offer
        status: "INTERVIEW",
        coverLetter: "Estoy muy interesado en esta posición porque...",
      },
      {
        jobId: ofertaDatos.id,
        graduateId: graduates[1].id, // María → Data offer
        status: "REVIEWED",
        coverLetter: "Mi experiencia en análisis de datos me hace ideal...",
      },
      {
        jobId: ofertaCivil.id,
        graduateId: graduates[2].id, // Pedro → Civil offer
        status: "PENDING",
      },
      {
        jobId: ofertaSistemas.id,
        graduateId: graduates[6].id, // Félix → Systems offer
        status: "PENDING",
      },
    ],
  })

  console.log("  ✓ 4 postulaciones creadas")

  // ─── 8. ENCUESTAS ─────────────────────────────────────────────────────────
  console.log("→ Creando encuestas...")

  // Encuesta general de inserción laboral (seguimiento básico)
  const survey = await prisma.survey.create({
    data: {
      title: "Encuesta de Inserción Laboral 2025",
      description:
        "Esta encuesta busca conocer la situación laboral actual de los egresados para mejorar los planes de estudio y servicios de la universidad.",
      isGlobal: true,
      isActive: true,
      endsAt: new Date("2026-07-31"),
      questions: {
        create: [
          {
            text: "¿Cuál es tu situación laboral actual?",
            type: "single",
            options: [
              "Empleado en relación de dependencia",
              "Trabajo independiente / emprendedor",
              "Desempleado buscando trabajo",
              "Estudiando (posgrado u otra carrera)",
            ],
            required: true,
            order: 1,
          },
          {
            text: "¿En qué sector trabajas actualmente?",
            type: "single",
            options: [
              "Tecnología e Informática",
              "Sector Público",
              "Educación",
              "Construcción e Ingeniería",
              "Finanzas y Contabilidad",
              "Otro",
            ],
            required: true,
            order: 2,
          },
          {
            text: "¿Cuánto tiempo tardaste en encontrar tu primer empleo tras egresar?",
            type: "single",
            options: [
              "Menos de 1 mes",
              "1 a 3 meses",
              "3 a 6 meses",
              "6 meses a 1 año",
              "Más de 1 año",
              "Aún no encuentro empleo",
            ],
            required: true,
            order: 3,
          },
          {
            text: "¿Tu trabajo actual está relacionado con tu carrera?",
            type: "single",
            options: [
              "Sí, directamente relacionado",
              "Parcialmente relacionado",
              "No está relacionado",
            ],
            required: true,
            order: 4,
          },
          {
            text: "¿Qué habilidades crees que debería reforzar la universidad?",
            type: "multiple",
            options: [
              "Habilidades técnicas / tecnológicas",
              "Idiomas (inglés u otros)",
              "Trabajo en equipo y comunicación",
              "Emprendimiento e innovación",
              "Gestión de proyectos",
              "Habilidades investigativas",
            ],
            required: true,
            order: 5,
          },
          {
            text: "¿Qué tan satisfecho estás con la formación recibida en la UNA Puno?",
            type: "rating",
            required: true,
            order: 6,
          },
          {
            text: "¿Tienes alguna sugerencia para mejorar la empleabilidad de los egresados?",
            type: "textarea",
            required: false,
            order: 7,
          },
        ],
      },
    },
    include: { questions: true },
  })

  // Encuesta institucional de empleabilidad EPIS — instrumento oficial de seguimiento
  await prisma.survey.create({
    data: {
      title: "Encuesta Institucional de Empleabilidad — EPIS 2026",
      description:
        "Instrumento oficial de la Escuela Profesional de Ingeniería de Sistemas para el seguimiento de la inserción laboral de sus egresados. " +
        "Los datos obtenidos se utilizan para la acreditación institucional y la mejora continua del plan de estudios.",
      isGlobal: true,
      isActive: true,
      endsAt: new Date("2026-12-31"),
      questions: {
        create: [
          // ── Situación laboral ──────────────────────────────────────────────
          {
            text: "¿Actualmente se encuentra laborando?",
            type: "yesno",
            required: true,
            order: 1,
          },
          {
            text: "¿En qué tipo de empleo se encuentra?",
            type: "single",
            options: [
              "Dependiente (en planilla / contrato)",
              "Independiente o freelance",
              "Prácticas preprofesionales o profesionales",
              "No aplica (sin empleo actualmente)",
            ],
            required: true,
            order: 2,
          },
          {
            text: "¿Su empleo actual está relacionado con la carrera de Ingeniería de Sistemas?",
            type: "single",
            options: [
              "Directamente relacionado",
              "Parcialmente relacionado",
              "No está relacionado con la carrera",
              "No aplica (sin empleo actualmente)",
            ],
            required: true,
            order: 3,
          },
          {
            text: "¿Cuánto tiempo le tomó conseguir su primer empleo después de egresar?",
            type: "single",
            options: [
              "Menos de 3 meses",
              "De 3 a 6 meses",
              "De 6 meses a 1 año",
              "Más de 1 año",
              "Aún no he encontrado empleo",
            ],
            required: true,
            order: 4,
          },
          // ── Información laboral ────────────────────────────────────────────
          {
            text: "Nombre de la empresa o institución donde trabaja actualmente",
            type: "text",
            required: false,
            order: 5,
          },
          {
            text: "Cargo o puesto que desempeña actualmente",
            type: "text",
            required: false,
            order: 6,
          },
          {
            text: "Modalidad de trabajo",
            type: "single",
            options: [
              "Presencial",
              "Semipresencial (híbrido)",
              "Remoto (teletrabajo)",
              "No aplica",
            ],
            required: false,
            order: 7,
          },
          // ── Formación profesional ──────────────────────────────────────────
          {
            text: "¿Cómo califica la formación profesional recibida en la EPIS — UNA Puno?",
            type: "rating",
            required: true,
            order: 8,
          },
          {
            text: "¿Los conocimientos y habilidades adquiridos en la carrera son útiles en su trabajo?",
            type: "single",
            options: [
              "Muy útiles",
              "Útiles",
              "Poco útiles",
              "No aplica (sin empleo actualmente)",
            ],
            required: true,
            order: 9,
          },
          // ── Seguimiento institucional ──────────────────────────────────────
          {
            text: "¿Le interesaría participar en actividades de seguimiento organizadas por la EPIS?",
            type: "yesno",
            required: true,
            order: 10,
          },
          {
            text: "¿Qué tipo de actividades le interesarían? (puede marcar varias)",
            type: "multiple",
            options: [
              "Certificaciones y cursos tecnológicos",
              "Talleres de emprendimiento e innovación",
              "Charlas de empleabilidad y CV",
              "Ferias laborales y networking",
              "Actualización técnica en áreas de la carrera",
              "Red de egresados y mentoría",
            ],
            required: false,
            order: 11,
          },
          {
            text: "¿Tiene algún comentario o sugerencia adicional para la Escuela Profesional?",
            type: "textarea",
            required: false,
            order: 12,
          },
        ],
      },
    },
  })

  console.log("  ✓ 2 encuestas creadas (7 preguntas + 12 preguntas)")

  // ─── 9. RESPUESTAS A LA ENCUESTA ──────────────────────────────────────────
  console.log("→ Creando respuestas de encuesta...")

  const questions = survey.questions.sort((a, b) => a.order - b.order)

  const responsesData = [
    {
      graduate: graduates[0], // Juan (Empleado, TI)
      answers: [
        { qIdx: 0, value: "Empleado en relación de dependencia" },
        { qIdx: 1, value: "Tecnología e Informática" },
        { qIdx: 2, value: "1 a 3 meses" },
        { qIdx: 3, value: "Sí, directamente relacionado" },
        { qIdx: 4, value: ["Idiomas (inglés u otros)", "Gestión de proyectos"] },
        { qIdx: 5, value: 4 },
        { qIdx: 6, value: "Sería bueno tener más convenios con empresas tecnológicas." },
      ],
    },
    {
      graduate: graduates[1], // María (Empleada, sector público)
      answers: [
        { qIdx: 0, value: "Empleado en relación de dependencia" },
        { qIdx: 1, value: "Sector Público" },
        { qIdx: 2, value: "3 a 6 meses" },
        { qIdx: 3, value: "Parcialmente relacionado" },
        { qIdx: 4, value: ["Habilidades técnicas / tecnológicas", "Idiomas (inglés u otros)"] },
        { qIdx: 5, value: 3 },
        { qIdx: 6, value: "Mejorar los laboratorios de cómputo y acceso a internet." },
      ],
    },
    {
      graduate: graduates[4], // Carlos (Independiente)
      answers: [
        { qIdx: 0, value: "Trabajo independiente / emprendedor" },
        { qIdx: 1, value: "Finanzas y Contabilidad" },
        { qIdx: 2, value: "Menos de 1 mes" },
        { qIdx: 3, value: "Sí, directamente relacionado" },
        { qIdx: 4, value: ["Emprendimiento e innovación", "Gestión de proyectos"] },
        { qIdx: 5, value: 5 },
        { qIdx: 6, value: null },
      ],
    },
  ]

  for (const responseData of responsesData) {
    const response = await prisma.surveyResponse.create({
      data: {
        surveyId: survey.id,
        graduateId: responseData.graduate.id,
        answers: {
          create: responseData.answers
            .filter((a) => a.value !== null)
            .map((a) => ({
              questionId: questions[a.qIdx].id,
              value: a.value as string | number | string[],
            })),
        },
      },
    })
    void response
  }

  console.log("  ✓ 3 respuestas de encuesta creadas")

  // ─── 10. EVENTOS ──────────────────────────────────────────────────────────
  console.log("→ Creando eventos institucionales...")

  await prisma.event.createMany({
    data: [
      {
        title: "Feria de Empleabilidad UNA Puno 2025",
        description:
          "Gran feria donde más de 30 empresas de la región presentarán sus ofertas laborales para egresados y estudiantes de últimos ciclos.",
        date: new Date("2026-07-15T09:00:00"),
        location: "Pabellón Central — UNA Puno",
        isPublished: true,
      },
      {
        title: "Ceremonia de Graduación — Promoción 2025",
        description:
          "Ceremonia oficial de colación de grado para los egresados de la promoción 2025 de todas las facultades.",
        date: new Date("2026-08-20T10:00:00"),
        location: "Auditorio Central UNA Puno",
        isPublished: true,
      },
      {
        title: "Taller: Preparación para Entrevistas de Trabajo",
        description:
          "Taller gratuito orientado a egresados sobre cómo afrontar procesos de selección, preparar el CV y desarrollar habilidades blandas.",
        date: new Date("2026-06-10T15:00:00"),
        location: "Sala de Usos Múltiples — Facultad de Ingeniería",
        isPublished: true,
      },
    ],
  })

  console.log("  ✓ 3 eventos creados")

  // ─── RESUMEN FINAL ────────────────────────────────────────────────────────
  console.log("\n✅ Seed completado exitosamente.")
  console.log("─────────────────────────────────────────")
  console.log(`  Facultades:          4`)
  console.log(`  Escuelas:            6`)
  console.log(`  Usuarios:            ${graduates.length + 3} (1 admin + 1 director + 1 coordinador + ${graduates.length} egresados)`)
  console.log(`  Egresados:           ${graduates.length}`)
  console.log(`  Experiencias lab.:   6`)
  console.log(`  Empresas:            3`)
  console.log(`  Ofertas laborales:   3`)
  console.log(`  Postulaciones:       4`)
  console.log(`  Encuestas:           2 (7 + 12 preguntas, 3 respuestas en la primera)`)
  console.log(`  Eventos:             3`)
  console.log("─────────────────────────────────────────")
  console.log("\n  Credenciales de prueba:")
  console.log("  Admin:        admin@unap.edu.pe       / admin123")
  console.log("  Director:     director@epis.edu.pe    / director123")
  console.log("  Coordinador:  coordinador@epis.edu.pe / coordinador123")
  console.log("  Egresado:     juan.mamani@gmail.com   / password123")
  console.log("\n  Abre Prisma Studio con: npx prisma studio")
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
