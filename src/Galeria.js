import * as THREE from 'three'
import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, OrbitControls } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import getUuid from 'uuid-by-string'

const GOLDENRATIO = 1.61803398875

const DATAESP = [
`CHRISTIAN FELIPE TORRES 
        Datos Personales 
         CI: 0103576575  
Edad: 42 años
Estado Civil: Soltero
Nacionalidad: Ecuador  
Trabajo actual en: Perú (Remoto)











Residencia Actual: Ecuador
Dirección:
Cdla Refugio del Mar V. 52
Gnral Villamil - Playas
       ECUADOR
      +593 984794678
  felipet73@hotmail.com    
`,
`CONOCIMIENTOS DESARROLLO 

Desarrollo aplicaciones PC-WEB-MOVIL 
Lenguajes: C/C++, pascal, cobol, Fortran, VB 6.0 .NET
C# Fox, Phyton, Apis VBA-C# con MSProject, Excel, Autocad, Revit, WPF, XAML
HTML-CSS-PHP, Javascript, Tapescrypt. React, Node, APIs rest, Boostrap,
Oauth2, socialite, POO, MVC, JQuery, Vue, Socket io, JSon, Chatbots
Frontend, Backend, BD Sql server, MySql, SQLite, no relacionales MongoDB, 
Laravel, Angular, React Native, Android Studio, Kotlin
Automatización de procesos RPA con UiPath`,
`CONOCIMIENTOS CONSTRUCCION

Programación y Control de Obras 
Cumplimiento contractual (LOSNCP)
Presupuestos (OPUS, InterPro, Proexcel, Presto, S10) 
APUS - Licitaciones (SERCOP)
Planillas (elaboración/revisión) - Costo+Porcentaje - Rubros adicionales
Evaluacion de catidades de obra
Formulas de Reajuste de precios - Cronogramas (Project, Primavera)
Planificación y seguimiento de consumo de Insumos (Costo)
Planos (Auto CAD - Civil 3D- Micro estación - Revit - Civil 3D) - ArcGis
Automatización tareas (lenguajes de programación-bases de datos) 
UiPath`,
`ESTUDIOS:
Escuela San José La Salle básica
Colegio ITSS Cuenca
Bachiller Mecánica Automotriz
Universidad de Cuenca
3er Año Ing. Sistemas 
Structuralia
Master Programación BIM
Soy Autodidacta: siempre sigo cursos, libros y Web
Tengo más de 470 Cursos, soy amante del conocimiento y la información
Siempre estoy profundizando conocimientos
Actualmente estoy aprendiendo inglés en OpenEnglish
siguiendo cursos técnicos en Ingles
Busco profundizar los conceptos para realmente entenderlos,
quizá es lo que me diferencia de otras personas, que regularmente
se contentan con conocer algo superficialmente.
`,
` EXPERIENCIA PROFESIONAL 
Inicié trabajando dando asesoría en programación a estudiantes de Universidades, 7 años.
Trabajé 12 años en varios proyectos de construcción alrededor de
todo el Ecuador en áreas relacionadas a programación y control de proyectos,
Desde hace 3 años he intensificado en la automatización 
de procesos técnico-administrativos para control de proyectos de construcción
mediante el desarrollo de aplicaciones que automatizan los procesos, gestionan y 
distribuyen la información, finalmente esto me abrió la puerta desde aproximadamente un año a trabajar en el desarrollo de una herramienta que gestione los presupuestos a partir de un modelo BIM.
`,
` MANEJO DE UTILITARIOS 

Office avanzado, MS Project, Primavera
Adobe Photoshop, Illustrator, Flash, Audition, Premiere, Acrobat
Corel Draw
Autodesk Autocad 2D y 3D, Civil 3D, Revit Dynamo, Navisworks, Maya
BIM 360, Rhinoceros 3D Grasshoper, Microstation
Camptasia, After Effects, 
Opus, Presto, S10, Proexcel
Sketchup, UIPath, Final Cut
Cinema 4D, Open Roads, Open Built
Aprendiendo actualmente:
Blender, Solidworks, Inventor
Varios otros..
`,
`SOBRE MI.

Nunca especulo en temas de relevancia.
Mido bien el riesgo antes de emitir un resultado en donde existe alguna posibilidad de inconsistencia.
Creo que un criterio siempre puede modificarse.
Nunca compito contra nadie, no me interesa.
No negocio con los ideales.
Creo en que apuntar siempre hacia la excelencia lleva a un resultado bastante adecuado.
Creo en el aprendizaje constante.
Creo en potenciar las habilidades.
Creo que si no me es posible ayudar, por lo menos si me es posible evitar el hacer mal.
Creo que lo que no conoces hoy lo puedes conocer mañana.
`,
`CONOCIMIENTOS ESPECIFICOS BIM

Actualmente mes estoy especializando en Programación aplicada a BIM,
conozco bien Autocad, Revit, Navisworks, BIM 360 

Estoy aprendiendo Blender y SolidWorks para profundizar en CAM.

Automatizo varias tareas en estos entornos interactuando con otras aplicaciones:

Abrir modelos con el visor Viewer enviar y recibir información mediante APIs 
en Revit, Autocad, Excel, Word, MSProject, Winforms, etc.


`,
`CONOCIMIENTOS BIM II
* Desarrollo Phyton con Dynamo
* Desarrollo Grashopper en Rhino 
* Desarrollo en C# API de Autocad (ArcObjects) Winforms
* Desarrollo en C# API de Revit WPF XAML y Forms
* Desarrollo en C# en excel, word y MSProject, importando modelos 3D, planos de autocad e interactuando mediante Web Forms con Forge
* Desarrollo con las APIs de Forge (C# con ASP.Net, React, Javascript nativo) Autentificación, accesos e interacción con la Nube de Autodesk ACC, carga de modelos con el viewer
* Desarrollo con JS React, React Native, WEBGL con Canvas, threejs, react-three-fiber
* Estoy aprendiendo la librería IFCjs, considero que tiene mucho futuro, sin embargo el potencial de Forge es muy superior actualmente.`
];



const DATAING = [
  `CHRISTIAN FELIPE TORRES 
          Personal information 
          ID: 0103576575  
  Age: 42 años
  Marital Status: Single
  Nationality: Ecuador
  Current job in: Peru (Remote)
  
  
  
  
  
  
  
  
  
  
  
  Current Residence: Ecuador
  Adress:
  Cdla Refugio del Mar V. 52
  Gnral Villamil - Playas
         ECUADOR
        +593 984794678
    felipet73@hotmail.com    
  `,
  `KNOWLEDGE DEVELOPMENT
  
  Development of PC-WEB-MOBILE applications
  Languages: C / C ++, pascal, cobol, Fortran, VB 6.0 .NET
  C # Fox, Python, Apis VBA-C # with MSProject, Excel, Autocad, Revit, WPF, XAML
  HTML-CSS-PHP, Javascript, Tapescrypt. React, Node, APIs rest, Boostrap,
  Oauth2, socialite, POO, MVC, JQuery, Vue, Socket io, JSon, Chatbots
  Frontend, Backend, BD Sql server, MySql, SQLite, non-relational MongoDB,
  Laravel, Angular, React Native, Android Studio, Kotlin
  RPA process automation with UiPath`,
  `KNOWLEDGE CONSTRUCTION
  
  Scheduling and Control of Works
  Contractual compliance (LOSNCP)
  Budgets (OPUS, InterPro, Proexcel, Presto, S10)
  APUS - Tenders (SERCOP)
  Spreadsheets (preparation / review) - Cost + Percentage - Additional items
  Evaluation of work quantities
  Price Adjustment Formulas - Schedules (Project, Spring)
  Planning and monitoring of input consumption (Cost)
  Drawings (Auto CAD - Civil 3D- Micro station - Revit - Civil 3D) - ArcGis
  Automation of tasks (programming languages-databases)
  UiPath`,
  `STUDIES:
  San José La Salle Basic School
  ITSS Cuenca School
  Bachelor of Automotive Mechanics
  University of Cuenca
  3rd Year Systems Engineer Structuralia
  BIM Programming Master I am Self-taught: I always follow courses, books and the Web I have more than 470 courses, I am a lover of knowledge and information
  I am always deepening knowledge I am currently learning English at OpenEnglish following technical courses in English
  I seek to deepen the concepts to really understand them, perhaps it is what differentiates me from other people, who regularly they are content with knowing something superficially.
  `,
  ` PROFESSIONAL EXPERIENCE
  I started working giving programming advice to university students, 7 years old.
  I worked 12 years on various construction projects around
  all of Ecuador in areas related to project programming and control,
  For 3 years I have intensified in automation
  of technical-administrative processes for control of construction projects
  by developing applications that automate processes, manage and
  distribute the information, finally this opened the door for me for about a year to work on the development of a tool that manages budgets from a BIM model.
  `,
  ` UTILITY MANAGEMENT
  
  Advanced Office, MS Project, Primavera
  Adobe Photoshop, Illustrator, Flash, Audition, Premiere, Acrobat
  Corel Draw
  Autodesk Autocad 2D and 3D, Civil 3D, Revit Dynamo, Navisworks, Maya
  BIM 360, Rhinoceros 3D Grasshoper, Microstation
  Camptasia, After Effects,
  Opus, Presto, S10, Proexcel
  Sketchup, UIPath, Final Cut
  Cinema 4D, Open Roads, Open Built
  Currently learning:
  Blender, Solidworks, Inventor
  Several others ..
  `,
  `ABOUT ME.
  
  I never speculate on issues of relevance.
  I measure the risk well before issuing a result where there is any possibility of inconsistency.
  I believe that a criterion can always be modified.
  I never compete against anyone, I am not interested.
  I don't trade with ideals.
  I believe that always aiming for excellence leads to a fairly adequate result.
  I believe in constant learning.
  I believe in enhancing skills.
  I believe that if it is not possible for me to help, at least if it is possible for me to avoid doing wrong.
  I think that what you don't know today you can know tomorrow.
  `,
  `SPECIFIC KNOWLEDGE BIM
  
  Currently I am specializing in Programming applied to BIM,
  I know well Autocad, Revit, Navisworks, BIM 360
  
  I am learning Blender and SolidWorks to delve into CAM.
  
  I automate various tasks in these environments by interacting with other applications:
  
  Open models with the Viewer viewer send and receive information through APIs
  in Revit, Autocad, Excel, Word, MSProject, Winforms, etc.
  
  
  `,
  `KNOWLEDGE BIM II
  * Python development with Dynamo
  * Grashopper development in Rhino
  * Development in C # API of Autocad (ArcObjects) Winforms
  * Development in C # API of Revit WPF XAML and Forms
  * Development in C # in excel, word and MSProject, importing 3D models, autocad plans and interacting through Web Forms with Forge
  * Development with Forge APIs (C # with ASP.Net, React, native Javascript) Authentication, accesses and interaction with the Autodesk ACC Cloud, loading of models with the viewer
  * Development with JS React, React Native, WEBGL with Canvas, threejs, react-three-fiber
  * I am learning the IFCjs library, I think it has a great future, however Forge's potential is much higher today.`
  ]



export default function Galeria({ images, idioma }) {
  //alert(idioma)
  return (
    <>
    <Suspense fallback={null}>
    <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <color attach="background" args={['black']} />
      {/* // <fog attach="fog" args={['#191920', 0, 15]} /> */}
      <fog attach="fog" args={['rgba(0,127,127,0.43)', -10, 50]} opacity={0.7}/>
      <Environment preset="city" />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} idioma={idioma} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={60}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#151515"
            metalness={0.5}
          />
        </mesh>
      </group>
      {/* <OrbitControls
      enableZoom={false}
      enablePan={false}
      //maxAzimuthAngle={Math.PI / 2}
      //maxPolarAngle={Math.PI}
      //minAzimuthAngle={-Math.PI / 2}
      //minPolarAngle={0}
      /> */}
    </Canvas>
    </Suspense>
    </>
  )
}

function Frames({ images, idioma , q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt ) => {
    state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt))
    state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt))
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props, i) => <Frame key={props.url} idioma={idioma} {...props} i={i} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), i, idioma, ...props }) {
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const [visible, setVisible] = useState(true);
  const image = useRef()
  const frame = useRef()
  const name = getUuid(url)
  
  useCursor(hovered)
    useFrame((state) => {
      if (visible){

        image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
        image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
        frame.current.material.color.lerp(c.set(hovered ? 'rgba(0,127,127,0.43)' : 'rgba(0,160,127,0.93)').convertSRGBToLinear(), 0.1)            
  
      }
    })
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => {e.stopPropagation(); hover(true); setVisible(false);}}
        onPointerOut={() => {hover(false); setVisible(true);}}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        {/* <meshStandardMaterial color="rgba(0,127,127,0.43)" opacity={0.20} metalness={0.8} roughness={0.5} envMapIntensity={1.5} /> */}
        <meshStandardMaterial roughness={1} transparent opacity={0.10} color={'rgb(0, 127, 127)'} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          {/* <meshBasicMaterial color="rgba(0,127,127,0.13)" toneMapped={false} fog={false} opacity={0.2} /> */}
          <meshStandardMaterial roughness={1} transparent opacity={0.30} color={'rgb(0, 127, 127)'} color={'rgb(0, 255, 255)'} />
          {/* <shadowMaterial opacity={0.2} /> */}
        </mesh>
        {visible && <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />}
      </mesh>
      <Text maxWidth={0.85} anchorX="left" anchorY="top" position={[-0.41, GOLDENRATIO-0.01, -0.11]} fontSize={0.055} >
        {/*name.split('-').join(' ')*/idioma==='Español' ? DATAESP[i]:DATAING[i]}
      </Text>
    </group>
  )
}
