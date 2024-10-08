import React ,{useState}from 'react';
import './public/styles/presentation.css'; // Fichier CSS pour le style
import directeurimage from '../Assets/profile.jpg';
import Header from './public/Header';
import logo from '../Assets/logo-no-background.png'
const Presentation = () => {
  const [langue, setSelectedOption] = useState('francais');

  // Event handler for when the dropdown selection changes
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const presentationText = `Une école doctorale dans le domaine des "Sciences Exactes et Naturelles" (EDSEN)à la Faculté des Sciences de Gabès, avec le soutien de certaines institutions affiliées à l'Université de Gabès, telles que l'Institut Supérieur des Sciences et Techniques de l'Eau de Gabès, l'Institut Supérieur de Biologie Appliquée de Médenine ainsi que l'Institut des Régions Arides. Cette école fournit une plateforme sectorielle à plusieurs voies pour la formation et la recherche, opérant dans le cadre du système "IMAD". Elle supervise le bon déroulement des études doctorales et s'engage dans le développement de la qualité de l'encadrement des étudiants, offrant une formation scientifique supplémentaire et complète ainsi que l'acquisition de nouvelles compétences adaptées aux besoins économiques environnants, contribuant au développement de leur culture entrepreneuriale et facilitant ainsi leur intégration sur le marché du travail. La Faculté des Sciences de Gabès est responsable de la gestion administrative et financière de cette école, sous la supervision de l'Université de Gabès.`;
  
  const roleText = `Parmi les missions de cette école, il y a la coordination entre les structures de recherche (laboratoires, unités, etc.) et leur regroupement autour de projets scientifiques et technologiques communs et intégrés, inscrits dans le cadre des priorités nationales en vue de créer un pôle (ou des pôles) d'excellence dans le domaine des Sciences Exactes et/ou Naturelles, cherchant à fournir un environnement propice à l'échange d'expertises scientifiques entre elles et à unifier les efforts pour promouvoir la recherche scientifique et améliorer ses indicateurs, ainsi qu'à adopter une politique efficace de coopération nationale et internationale. Il est donc nécessaire d'apporter davantage de cohérence à la gouvernance des études doctorales menées par les comités.`;

  const objectifText = `Parmi les objectifs principaux de l'école, il y a la médiation pour surmonter les obstacles à l'ouverture des institutions d'enseignement supérieur et de recherche aux composantes économiques, industrielles et agricoles régionales, ainsi que le renforcement du partenariat intersectoriel. Ensuite, au deuxième niveau, il y a la recherche de mécanismes pour impliquer le secteur privé et les organismes de développement dans le financement ou la contribution au financement de projets et programmes de recherche scientifique, pour encourager la réalisation de thèses par les institutions économiques et/ou les soutenir. Cette école peut également contribuer au rayonnement scientifique national et international des structures de recherche, à la présentation des chercheurs et de leurs activités, à la valorisation des résultats de la recherche et à leur utilisation pour soutenir les institutions économiques, ouvrant ainsi des options et des perspectives professionnelles aux diplômés du doctorat. Cette école aura également un rôle stratégique consistant à suivre les indicateurs des activités des étudiants et des structures de recherche qui lui sont affiliées, ainsi que le devenir des diplômés, en exploitant des plates-formes numériques et des bases de données.`;
  const presentationTextarab ='مدرسة دكتوراه في ميدان " العلوم الصحيحة و الطبيعية " في كلية العلوم بقابس و بدعم من بعض المؤسّسات الراجعة بالنظر لجامعة قابس، كالمعهد العالي لعلوم و تقنيات المياه بقابس و المعهد العالي للبيولوجيا التطبيقية بمدنين إضافة إلى معهد المناطق القاحلة، توفر هذه مدرسة منصّة قطاعية متعددة الروافد للتكوين و البحث تنشط في إطار منظومة " إمد "، تشرف على حسن سير دراسات الدكتوراه و تعنى بتطوير جودة التأطير للطلبة، توفير تكوين علمي إضافي و شامل لهم و إكسابهم كفاءات جديدة تتلاءم مع احتياجات المحيط الاقتصادي و تساهم في تنمية ثقافة المبادرة لديهم و بالتالي تيسير اندماجهم في سوق الشغل. تتكفّل كلية العلوم بقابس بالتصرّف الإداري و المالي في هذه المدرسة وذلك تحت إشراف جامعة قابس.'
  
  const roleTextarab ='من مهام هذه المدرسة، التنسيق بين هياكل البحث (مخابر، وحدات، ...) و تجميعها حول مشاريع علمية و تكنولوجية مشتركة و متكاملة تندرج في إطار المحاور ذات الأولوية الوطنية بغية إنشاء قطب (أو أقطاب) امتياز في مجال العلوم الصحيحة و/أو الطبيعية، السّعي إلى توفير مناخ ملائم لتبادل الخبرات العلمية بينها و توحيد الجهود للرقيّ بالبحث العلمي و تحسين مؤشّراته و تبنّي سياسة ناجعة للتعاون الوطني و الدولي. لهذا وجب إضفاء المزيد من التناسق في حوكمة دراسات الدكتوراه التي تضطلع بها اللجان.'

  const objectifTextarab = 'من بين الأهداف الرئيسية للمدرسة، الوساطة لتذليل العقبات أمام انفتاح مؤسسات التعليم العالي والبحث على مكوّنات النسيج الاقتصادي، الصناعي و الفلاحي الجهوي و تعزيز الشراكة البينيّة. ثمّ في مستوى ثان، البحث عن آليات لانخراط القطاع الخاص و الهيئات التنموية في تمويل أو المساهمة في تمويل مشاريع و برامج البحث العلمي و لتشجيع انجاز الأطروحات بالمؤسسات الاقتصادية و/أو دعمها. يمكن لهذه المدرسة أن تساهم أيضا في الإشعاع العلمي الوطني والدولي لهياكل البحث، التعريف بالباحثين و بأنشطتهم، تثمين نتائج البحث و استغلالها في دعم المؤسّسات الاقتصادية و من ثمّ فتح الخيارات و الآفاق المهنية أمام خرّيجي مرحلة الدكتوراه. سيكون لهذه المدرسة أيضا دور استراتيجي يتمثّل في متابعة المؤشرات الخاصة بأنشطة الطلبة و هياكل البحث التابعين لها و بمستقبل المتخرّجين عن طريق استغلال منصّات رقمية و قواعد بيانات'

  return (
   <div>
    <Header/>
    <div className="App">
      <img style={{margin:'40px', width:'75%' ,marginLeft:'150px'}} src={logo} alt="EDSEN" />
      <header style={{marginBottom:'10px'}} className="App-header">
      <h1>École Doctorale De Science Exactes Et Naturel  </h1>
      <select style={{marginLeft:'800px'}} value={langue} onChange={handleChange}>
      <option value="francais" >Francais</option>
        <option value="arabe"> Arabique</option>
        
      </select>
      </header>
   <div className="presentation-container">
      <h2>Présentation</h2>
      <p>{langue=='francais' ? ` ${presentationText}` : ` ${presentationTextarab}`}</p>
      <h2>Rôle</h2>
      <p>{langue=='francais' ? ` ${roleText}` : ` ${roleTextarab}`}</p>
      <h2>Objectif</h2>
      <p>{langue=='francais' ? ` ${objectifText}` : ` ${objectifTextarab}`}</p>
      <h2>Directeur</h2>
      <div className="director-info">
        <img src={directeurimage} alt="Directeur" />
        <div>
          <p>{langue=='francais' ? ` Nom: Ala` : `الإسم:علاء`}</p>
          <p>{langue=='francais' ? ` Prénom: Bacha` : `اللقب :باشا `}</p>
          <p >{langue=='francais' ? ` Email: alabacha@gmail.com` : `   alabacha@gmail.com : بريدالإلكتروني `}</p>
        </div>
      </div>
    </div> 
    </div>
       </div>

  );
};


export default Presentation;
