import draImage from '../assets/dra.png';
import rtecImage from '../assets/rtec.png';
import concreteImage from '../assets/concrete.png';
import circuitDiagram from '../assets/bootloader.png';
import pcbDesign from '../assets/placa_gerber.png';
import pcbDesign2 from '../assets/realPCB.png';
import rtecImage2 from '../assets/software2.png';
import rtecImage3 from '../assets/software3.png';
import rtecImage4 from '../assets/mysql.png';
import rtecImage5 from '../assets/rtgallery.png';
import rtecImage6 from '../assets/rtgallery2.png';
import rtecImage7 from '../assets/gallery3.jpg';
import rtecImage8 from '../assets/gallery4.jpg';

export const projects = [
    {
        id: 'dra-denisse-mayorga',
        title: "Dra. Denisse Mayorga",
        description_es: "Sitio web profesional para especialista en Gastropediatría.",
        description_en: "Professional website for a Pediatric Gastroenterologist.",
        tags: ["HTML", "CSS", "JavaScript", "Diseño Web"],
        link: "https://gastropediatramayorga.com/",
        image: draImage,
        type: "website"
    },
    {
        id: 'concrete-contractors',
        title: "Concrete Contractors",
        description_es: "Landing page optimizada para servicios de construcción en Vancouver.",
        description_en: "Optimized landing page for construction services in Vancouver.",
        tags: ["React", "SEO", "Landing Page"],
        link: "https://abc-concretecontractorsvancouver.com/",
        image: concreteImage,
        type: "website"
    },
    // Ejemplo de proyecto interno (Blog)
    {
        id: 'Automatic tester fixture',
        title: "Automatic tester fixture",
        description_es: "Dashboard administrativo para gestión de inventarios (Demo).",
        description_en: "Admin dashboard for inventory management (Demo).",
        tags: ["C#", "Arduino", "MySQL"],
        image: rtecImage, // Usar una imagen real cuando se tenga
        type: "blog",
        longDescription_en: `
When I was working at Roadtrack Ecuador, I had the opportunity to build a major project aimed at testing electronic devices in the company. This project was designed to improve maintenance in the production line. The main objective was to determine whether the electronic devices were in good condition to operate before starting production.

To solve this problem, I developed a mainboard using microelectronics. For this mainboard, I used an ATmega328P processor, onto which I loaded the bootloader, allowing me to program the new mainboard as an Arduino board.

If you want to learn how to do this, you can see the following diagram. <br/><br/>
<img src="${circuitDiagram}" alt="Circuit Diagram" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
          
Then I designed the two mainboards using Altium Designer. This powerful application allows you to build large projects

<div style="display: flex; gap: 20px; margin: 20px 0; max-width: 100%;">
    <div style="flex: 1; min-width: 0;">
        <img src="${pcbDesign}" alt="Circuit Diagram" style="width: 100%; height: auto; border-radius: 8px;" />
    </div>
    <div style="flex: 1; min-width: 0;">
        <img src="${pcbDesign2}" alt="Circuit Diagram" style="width: 100%; height: auto; border-radius: 8px;" />
    </div>
</div>

So far, we have seen the hardware and firmware; however, we also need software as an HMI (Human-Machine Interface). I developed the software in C# because it was a requirement in the company. You can see the final software in the following images

<img src="${rtecImage}" alt="Circuit Diagram" style="width: 100%; border-radius: 8px; margin: 20px 0;" />

In the previous image, we can see the main page, which allows us to connect to the mainboard by selecting the baud rate for communication
<img src="${rtecImage2}" alt="Circuit Diagram" style="width: 100%; border-radius: 8px; margin: 20px 0;" />

For testing wires, I send characters as words, for example, 'OK'. If one mainboard is able to send and the other mainboard is able to read, then the wires are OK. I used a multiplexer and some loops to achieve the objective

<img src="${rtecImage3}" alt="Circuit Diagram" style="width: 100%; border-radius: 8px; margin: 20px 0;" />

Finally, for data storage, I use MySQL on an Apache server

<img src="${rtecImage4}" alt="Circuit Diagram" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
`,
        longDescription_es: `
Cuando trabajaba en Roadtrack Ecuador, tuve la oportunidad de construir un gran proyecto destinado a probar dispositivos electrónicos en la empresa. Este proyecto fue diseñado para mejorar el mantenimiento en la línea de producción. El objetivo principal era determinar si los dispositivos electrónicos estaban en buenas condiciones para operar antes de comenzar la producción.

Para resolver este problema, desarrollé una placa base utilizando microelectrónica. Para esta placa base, utilicé un procesador ATmega328P, en el cual cargué el bootloader, lo que me permitió programar la nueva placa base como una placa Arduino.

Si quieres aprender cómo hacer esto, puedes ver el siguiente diagrama. <br/><br/>
<img src="${circuitDiagram}" alt="Diagrama de Circuito" style="width: 100%; border-radius: 8px; margin: 20px 0;" />

Luego diseñé las dos placas base utilizando Altium Designer. Esta potente aplicación permite construir grandes proyectos.

<div style="display: flex; gap: 20px; margin: 20px 0; max-width: 100%;">
    <div style="flex: 1; min-width: 0;">
        <img src="${pcbDesign}" alt="Diseño PCB" style="width: 100%; height: auto; border-radius: 8px;" />
    </div>
    <div style="flex: 1; min-width: 0;">
        <img src="${pcbDesign2}" alt="Diseño PCB" style="width: 100%; height: auto; border-radius: 8px;" />
    </div>
</div>

Hasta ahora, hemos visto el hardware y el firmware; sin embargo, también necesitamos software como HMI (Interfaz Hombre-Máquina). Desarrollé el software en C# porque era un requisito en la empresa. Puedes ver el software final en las siguientes imágenes.

<img src="${rtecImage}" alt="Software" style="width: 100%; border-radius: 8px; margin: 20px 0;" />

En la imagen anterior, podemos ver la página principal, que nos permite conectarnos a la placa base seleccionando la velocidad de baudios para la comunicación.
<img src="${rtecImage2}" alt="Software de Comunicación" style="width: 100%; border-radius: 8px; margin: 20px 0;" />

Para probar los cables, envío caracteres como palabras, por ejemplo, 'OK'. Si una placa base puede enviar y la otra placa base puede leer, entonces los cables están bien. Utilicé un multiplexor y algunos bucles para lograr el objetivo.

<img src="${rtecImage3}" alt="Prueba de Cables" style="width: 100%; border-radius: 8px; margin: 20px 0;" />

Finalmente, para el almacenamiento de datos, utilizo MySQL en un servidor Apache.

<img src="${rtecImage4}" alt="Base de Datos" style="width: 100%; border-radius: 8px; margin: 20px 0;" />
`,
        gallery: [rtecImage5, rtecImage6, rtecImage7, rtecImage8] // Ejemplo de galería use images imported
    }
];
