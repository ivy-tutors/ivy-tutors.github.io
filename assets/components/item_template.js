let shopItemTemplate = document.createElement('template');
shopItemTemplate.innerHTML = `

<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Poppins:300,400,500,700" rel="stylesheet">
<link href="../../assets/vendor/aos/aos.css" rel="stylesheet">
<link href="../../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="../../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
<link href="../../assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
<link href="../../assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
<link href="../../assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
<link href="../../assets/css/style.css" rel="stylesheet">

<section class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2 id="item_name"></h2>
          <ol>
            <li><a href="index.html">Home</a></li>
            <li><a href="merch.html">Merch</a></li>
            <li id="item_name_1"></li>
          </ol>
        </div>

      </div>
    </section>

    <section id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row gy-4">

          <div class="col-lg-6">
            <div class="portfolio-details-slider swiper">
              <div class="swiper-wrapper align-items-center">

                <div class="swiper-slide" id="01">
                  <img src="*.jpg" alt="" id="0" style="width:100%; height:auto;">
                </div>

                <div class="swiper-slide" id="11">
                  <img src="*.jpg" alt="" id="1">
                </div>

                <div class="swiper-slide" id="21">
                  <img src="*.jpg" alt="" id="2">
                </div>

                <div class="swiper-slide" id="31">
                  <img src="*.jpg" alt="" id="3">
                </div>

                <div class="swiper-slide" id="41">
                  <img src="*.jpg" alt="" id="4">
                </div>

                <div class="swiper-slide "id="51">
                  <img src="*.jpg" alt="" id="5">
                </div>

              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="portfolio-info">
              <h3>Project information</h3>
              <ul>
                <li><strong>Category</strong>: Web design</li>
                <li><strong>Client</strong>: ASU Company</li>
                <li><strong>Project date</strong>: 01 March, 2020</li>
                <li><strong>Project URL</strong>: <a href="#">www.example.com</a></li>
              </ul>
            </div>
            <div class="portfolio-description">
              <h2>This is an example of portfolio detail</h2>
              <p>
                Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>  
    
`

class Item_Template extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const script1 = document.createElement('script');
        script1.src = '../../assets/vendor/purecounter/purecounter.js';

        const script2 = document.createElement('script');
        script2.src = "../../assets/vendor/aos/aos.js";

        const script3 = document.createElement('script');
        script3.src ="../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js";

        const script4 = document.createElement('script');
        script4.src ="../../assets/vendor/glightbox/js/glightbox.min.js";

        const script5 = document.createElement('script');
        script5.src = "../../assets/vendor/isotope-layout/isotope.pkgd.min.js";

        const script6 = document.createElement('script');
        script6.src = '../../assets/vendor/swiper/swiper-bundle.min.js';

        const script7 = document.createElement('script');
        script7.src = '../../assets/js/main.js';

        const script8 = document.createElement('script');
        script8.src = '../../assets/js/merch.js';

        let source = this.getAttribute('url');
        let index = parseInt(this.getAttribute('index'));

        const setValues = (data) =>
        {
          let item  
          if(source == "../../data/run_results_best_sellers_sweaters_athletic_wear.json")
            {
                item = data.categories[(index)].best_sellers[(index)];
            }
          else
            {
                item = data.selection1[(index)];
            }
            this.shadowRoot.getElementById('item_name').innerHTML = item.name;
            this.shadowRoot.getElementById('item_name_1').innerHTML = item.name;
            for (let i = 0; i < 6; i++)
            {
                if (i < item.images.length)
                {
                  this.shadowRoot.getElementById(i.toString()).src = item.images[i].image;
                  console.log(this.shadowRoot.getElementById(i.toString()).src);
                  this.shadowRoot.getElementById(i.toString() + "1").hidden = false;
                }
            }
                
        }

        fetch(source)
        .then(res => res.json())
        .then(data => 
            setValues(data)
        )


        let shadowRoot = this.attachShadow({ mode: 'open' })
          
        shadowRoot.appendChild(shopItemTemplate.content);
        shadowRoot.appendChild(script1);
        shadowRoot.appendChild(script2);
        shadowRoot.appendChild(script3);
        shadowRoot.appendChild(script4);
        shadowRoot.appendChild(script5);
        shadowRoot.appendChild(script6);
        shadowRoot.appendChild(script7);
        shadowRoot.appendChild(script8);
       


        
    }
}

customElements.define('shop-item', Item_Template);
