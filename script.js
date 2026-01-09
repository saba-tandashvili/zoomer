/* ---------------- SEARCHIS FUNQCIA ---------------- */

const input = document.querySelector(".search input");
const items = document.querySelectorAll(".item");
const banners = document.querySelectorAll(".banner");
const titles = document.querySelectorAll(".section-title");
const carousels = document.querySelectorAll(".carousel-wrap");

const hideBlocks = document.querySelectorAll(
  ".promo-wrap, .promo-wrap2, .promo-wrap3, .promo-wrap4, .promo-grid-wrap, .promo-grid-wrap2, .brand-banner, .brands-wrap"
);

const layout = document.querySelector(".layout");
const carouselSingle = document.querySelector(".carousel");

if (input) {
  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    const searching = value !== "";

    banners.forEach(b => (b.style.display = searching ? "none" : ""));
    hideBlocks.forEach(b => (b.style.display = searching ? "none" : ""));
    titles.forEach(t => (t.style.display = searching ? "none" : ""));

    carousels.forEach(c => {
      c.style.display = searching ? "none" : "";
      if (c.firstElementChild) {
        c.firstElementChild.style.gridTemplateColumns = "";
      }
    });

    items.forEach(item => {
      const name = item.querySelector(".name")?.textContent.toLowerCase() || "";
      item.style.display = !searching || name.includes(value) ? "" : "none";
    });

    if (layout) layout.style.display = searching ? "none" : "";
    if (carouselSingle) {
      carouselSingle.style.display = searching ? "none" : "";
      carouselSingle.style.width = "auto";
    }

    carousels.forEach(carousel => {
      const grid = carousel.firstElementChild;
      if (!grid) return;

      const hasVisible = grid.querySelector(".item:not([style*='display: none'])");

      if (hasVisible && searching) {
        carousel.style.display = "";
        grid.style.gridTemplateColumns =
          window.innerWidth <= 870 ? "1fr" : "";

        const title = carousel.previousElementSibling;
        if (title?.classList.contains("section-title")) {
          title.style.display = "";
        }
      }
    });
  });
}

/* ---------------- SCROLL UP ---------------- */

const scrollup = document.querySelector(".scrollup");

if (scrollup) {
  window.addEventListener("scroll", () => {
    scrollup.style.display = window.scrollY > 200 ? "block" : "none";
  });

  scrollup.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------- LINKEBI ---------------- */

const nav = document.querySelector(".navigation");
if (nav) {
  nav.addEventListener("click", () => {
    window.open("nav.html", "_self");
  });
}

const procent = document.querySelector(".procent");
if (procent) {
  procent.addEventListener("click", () => {
    window.open("procent.html", "_self");
  });
}

/* ---------------- CART HOVER ---------------- */

const cart = document.querySelector(".cart");
const cartbtn = document.querySelector(".cartbtn");
const pricep = document.querySelector(".pricep");

let cleart;

if (cart && cartbtn) {
  cartbtn.addEventListener("mouseenter", () => {
    clearTimeout(cleart);
    cart.style.display = "block";
  });

  cartbtn.addEventListener("mouseleave", () => {
    cleart = setTimeout(() => (cart.style.display = "none"), 150);
  });

  cart.addEventListener("mouseenter", () => {
    clearTimeout(cleart);
    cart.style.display = "block";
  });

  cart.addEventListener("mouseleave", () => {
    cleart = setTimeout(() => (cart.style.display = "none"), 150);
  });
}

/* ---------------- CART FUNCTION ---------------- */

const buybtns = document.querySelectorAll(".buy");
const main = document.querySelector(".main");


function shortenText(text) {
  const words = text.split(" ");
  if (words.length <= 4) return text;
  return words.slice(0, 4).join(" ") + "\n" + words.slice(4, 6).join(" ") + " ...";
}

function updatetotal() {
  if (!pricep) return;

  let total = 0;
  document.querySelectorAll(".cartdiv").forEach(item => {
    const price = Number(
      item.querySelector(".cartprice")?.textContent.replace(" ₾", "")
    );
    const quantity = Number(item.querySelector(".numz")?.textContent);
    total += price * quantity;
  });

  pricep.textContent = total + " ₾";
}

buybtns.forEach(btn => {
  btn.addEventListener("click", e => {
    if (!main) return;

    const item = e.target.closest(".item");
    if (!item) return;

    const imgza = document.querySelector(".imgza")
    imgza.style.display = "none";


    const productname = item.querySelector(".name")?.textContent || "";
    const productprice = item.querySelector(".price")?.textContent || "";
    const productimg = item.querySelector(".item-img")?.getAttribute("src") || "";

    const newdiv = document.createElement("div");
    newdiv.className = "cartdiv";
    main.appendChild(newdiv);

    const img = document.createElement("img");
    img.className = "cartimg";
    img.src = productimg;
    newdiv.appendChild(img);

    const row = document.createElement("div");
    row.className = "cartrow";
    newdiv.appendChild(row);

    const name = document.createElement("p");
    name.className = "cartname";
    name.textContent = shortenText(productname);
    row.appendChild(name);

    const price = document.createElement("p");
    price.className = "cartprice";
    price.textContent = productprice;
    row.appendChild(price);

    const row2 = document.createElement("div");
    row2.className = "cartrow2";
    newdiv.appendChild(row2);

    const del = document.createElement("img");
    del.className = "dlt";
    del.src = "images-icons/image copy 158.png";
    del.addEventListener("click", () => {
      newdiv.remove();
      updatetotal();
    });
    row2.appendChild(del);

    const adder = document.createElement("div");
    adder.className = "adder";
    row2.appendChild(adder);

    const minus = document.createElement("p");
    minus.textContent = "-";
    adder.appendChild(minus);
    minus.classList.add("minus");

    const num = document.createElement("p");
    num.className = "numz";
    num.textContent = "1";
    adder.appendChild(num);

    const plus = document.createElement("p");
    plus.textContent = "+";
    adder.appendChild(plus);
    plus.classList.add("plus");

    minus.addEventListener("click", () => {
      if (Number(num.textContent) > 1) {
        num.textContent--;
        updatetotal();
      }
    });

    plus.addEventListener("click", () => {
      num.textContent++;
      updatetotal();
    });

    updatetotal();
  });
});


const megaMenuData = {
  mobile: {
    columns: [
      {
        title: 'მობილურის ბრენდები',
        items: ['Apple', 'Samsung', 'Xiaomi', 'Poco', 'Google', 'Nothing', 'OnePlus', 'Realme', 'Oppo', 'Nokia', 'Motorola', 'ყველას ნახვა']
      },
      {
        title: 'ყურსასმენები Buds',
        items: ['Apple Airpods', 'Galaxy Buds', 'Xiaomi Buds', 'Sony Buds', 'Nothing Buds', 'Realme Buds', 'JBL Buds', 'OnePlus Buds', 'Marshall Buds', 'Motorola Buds', 'Buds-ის აქსესუარები', 'ყველას ნახვა']
      },
      {
        title: 'Power banks',
        items: ['Anker', 'Ugreen', 'Xiaomi', 'ყველას ნახვა'],
        sections: [{
          title: 'მანქანის აქსესუარები',
          items: ['მანქანის დამტენი', 'მობილურის საკაზბერ', 'მანქანის საჭე', 'მანქანის კონს', 'ხონხანინები', 'ყველას ნახვა']
        }]
      },
      {
        title: 'მობილურის აქსესუარები',
        items: ['ეკრანის დამცავები', 'მობილურის საგაერთიანებელი/ფარეპერები', 'კონექტორები', 'კარდიდა', 'სათაშო ღილაკები', 'შეხსრების ბარათი', 'GPS ტრეკერები', 'კარტის დამცავები', 'სხველი ქონები', 'OTG ფლეშ მეხსიერებები', 'ყველას ნახვა']
      }
    ],
    bottom: [
      {
        title: 'უსადენო დამტენები',
        items: ['Apple', 'Samsung', 'Xiaomi', 'Ugreen', 'Belkin', 'Havit', 'Hoco', 'Anker', 'ყველას ნახვა']
      },
      {
        title: 'დამტენი ადაპტერი',
        items: ['Apple Adapter', 'Samsung Adapter', 'Anker Adapter', 'Spigen Adapter', 'Belkin Adapter', 'Ugreen Adapter', 'Xiaomi adapter', 'Baseus Adapter', 'ყველას ნახვა']
      },
      {
        title: 'მობილურის ჩასადგები',
        items: ['For Google', 'For Realme', 'For Apple', 'For Samsung', 'For Honor', 'For Xiaomi', 'For Oppo', 'For Motorola', 'For Nothing', 'For Oneplus', 'ყველას ნახვა']
      },
      {
        title: 'სმარტ საათები',
        items: ['Apple Watch', 'Galaxy Watch', 'Xiaomi Watch']
      }
    ]
  },
  tablet: {
    columns: [
      {
        title: 'ტაბები',
        items: ['Apple', 'Samsung', 'Xiaomi', 'Honor', 'Lenovo', 'OnePlus', 'Realme', 'ყველას ნახვა']
      },
      {
        title: 'სმარტ კლავიატურა | კალამი',
        items: ['Apple კლავიატურა', 'Apple კალამი', 'Baseus კლავიატურა', 'Baseus კალამი', 'ყველას ნახვა']
      },
      {
        title: 'ყურსასმენები',
        items: ['Headphones', 'Buds', 'Earphones', 'ყველას ნახვა']
      },
      {
        title: 'დამტენი ადაპტერი',
        items: ['Apple Adapter', 'Samsung Adapter', 'Anker Adapter', 'Spigen Adapter', 'Belkin Adapter', 'Ugreen Adapter', 'Xiaomi adapter', 'Baseus Adapter', 'ყველას ნახვა']
      }
    ],
    bottom: [
      {
        title: 'HUB გადამყვანები',
        items: ['Anker', 'Xiaomi', 'Baseus', 'Apple', 'Havit', 'TP-Link', 'Belkin', 'Ugreen', 'HP', 'ყველას ნახვა']
      },
      {
        title: 'გრაფიკული ტაბები',
        items: ['XP-Pen', 'Xiaomi', 'ყველას ნახვა']
      },
      {
        title: 'Power Banks',
        items: ['Anker', 'Ugreen', 'Xiaomi', 'ყველას ნახვა']
      },
      {
        title: 'კაბელი აქსესუარები',
        items: ['ტაბის ქეისები', 'ეკრანის დამცავი', 'კონექტორები', 'OTG ფლეშ მეხსიერება', 'შემსრებების ბარათი', 'ყველას ნახვა']
      }
    ]
  },
  laptop: {
    columns: [
      {
        title: 'ბრენდები',
        items: ['Apple', 'HP', 'Asus', 'Acer', 'Lenovo', 'Honor', 'Dell', 'MSI', 'ყველას ნახვა']
      },
      {
        title: 'Wi-Fi როუტერები',
        items: ['Tp-link', 'Xiaomi', 'Ubiquiti', 'WiFi Range Extender', 'Wi-Fi & Bluetooth ადაპტერები', 'ყველას ნახვა']
      },
      {
        title: 'ყურსასმენები',
        items: ['Headphones', 'Buds', 'Earphones', 'ყველას ნახვა']
      },
      {
        title: 'ლეპტოპის აქსესუარები',
        items: ['ჩაუსმი', 'ზაკსახუნი', 'კლავიატურები', 'HUB გადამყვანები', 'განძელელით სიმებით', 'ლეპტოპის დამცევი', 'მონიტორის საჩრდილები', 'ყველას ნახვა']
      }
    ],
    bottom: [
      {
        title: 'Gaming ლეპტოპები',
        items: ['HP Victus | OMEN', 'ACER Nitro | Predator', 'Dell Inspiron | Alienware', 'Lenovo LEGION | LOQ', 'ASUS ROG | TUF', 'MSI Katana | Crosshair', 'ყველას ნახვა']
      },
      {
        title: 'სოფლიზე შემოთხოვნა',
        items: ['მონიტორები', 'პროექტორები', 'პრინტერები', 'All in One', 'Web კამერები', 'მაგნიტები', 'ყველას ნახვა']
      },
      {
        title: 'მეხსიერების ბარათები',
        items: ['შიდამოქმედ SSD', 'შიდამოქმედ HDD', 'მობა SSD', 'დღეგე მეხსიერებები', 'შემსრებების ბარათები', 'ყველას ნახვა']
      },
      {
        title: 'ლეპტოპის ჩანთები',
        items: ['BackPack', 'Briefcase', 'Sleeve', 'Shoulder Strap', 'ყველას ნახვა']
      },
      {
        title: 'კაბელები',
        items: ['Lightning', 'Micro USB', 'Type-C', 'HDMI კაბელები', 'LAN კაბელები', 'AUX კაბელები', 'ყველას ნახვა']
      }
    ]
  },
  audio: {
    columns: [
      {
        title: 'ბრენდები',
        items: ['Apple', 'Samsung', 'Xiaomi', 'JBL', 'Sony', 'Bose', 'Beats', 'Realme', 'Marshall', 'ყველას ნახვა']
      },
      {
        title: 'ყურსასმენები',
        items: ['Headphones', 'Buds', 'Earphones', 'Gaming', 'სპორტული', 'საბავშვო', 'ყველას ნახვა']
      },
      {
        title: 'მიკროფონები',
        items: ['სტრიმინგ მიკროფონები', 'ვიდეოენ მიკროფონები', 'ლავალეინ მიკროფონები', 'უსაფენო მიკროფონები', 'ფოტოკამერის მიკროფონები', 'ყველას ნახვა']
      },
      {
        title: 'დამტენი ადაპტერი',
        items: ['Apple Adapter', 'Samsung Adapter', 'Anker Adapter', 'Spigen Adapter', 'Belkin Adapter', 'Ugreen Adapter', 'Xiaomi adapter', 'Baseus Adapter', 'ყველას ნახვა']
      }
    ],
    bottom: [
      {
        title: 'აუდიო ტექნიკა',
        items: ['პორტატული დინამიკები', 'სახლის დინამიკები', 'ფონოგრაფები', 'სმარტ აკსისტენტები', 'Soundbar', 'ყველას ნახვა']
      },
      {
        title: '',
        items: []
      },
      {
        title: 'აქსესუარები',
        items: ['Power Banks', 'დამტენი დამნებებლებელი', 'კაბელები', 'უსაფენო დამტენები', 'ყველას ნახვა']
      },
      {
        title: '',
        items: []
      }
    ]
  },
  gaming: {
    columns: [
      {
        title: 'PlayStation',
        items: ['კონსოლი', 'თამაშები', 'კონტროლერები', 'აქსესუარები', 'PlayStation VR', 'ყველას ნახვა']
      },
      {
        title: 'Gaming ლეპტოპები',
        items: ['HP Pavilion | Victus | OMEN', 'ACER Nitro | Predator', 'Dell Inspiron | Alienware', 'Lenovo LEGION | LOQ', 'ASUS ROG | TUF', 'MSI Katana | Crosshair', 'ყველას ნახვა']
      },
      {
        title: 'Gaming მონიტორები',
        items: ['Acer', 'BenQ', 'AOC', 'MSI', 'Dell', 'HP', 'Xiaomi', 'ყველას ნახვა']
      },
      {
        title: 'ვიმაინენ აქსესუარები',
        items: ['ყურსასმენები', 'მაუსები', 'კლავიატურები', 'საგამერო', 'სათამაშო სკამები', 'განსალელთელი პელების', 'დინამიკები', 'სტრიმინგ მიკროფონები', 'ვებ კამერები', 'HDMI & LAN კაბელები', 'რიგებერები', 'თრივერები', 'RGB განათება', 'მაგერები', 'ყველას ნახვა']
      }
    ],
    bottom: [
      {
        title: 'XBOX',
        items: ['კონსოლი', 'თამაშები', 'კონტროლერები', 'აქსესუარები', 'ყველას ნახვა']
      },
      {
        title: 'პორტატული & VR',
        items: ['Lenovo Legion Go S', 'Steam Deck', 'Asus Rog Ally', 'Backbone', 'Meta Quest', 'ყველას ნახვა']
      },
      {
        title: 'Nintendo',
        items: ['კონსოლები', 'თამაშები', 'კონტროლერები', 'აქსესუარები', 'ყველას ნახვა']
      },
      {
        title: '',
        items: []
      }
    ]
  },
  tv: {
    columns: [
      {
        title: 'ტელევიზორები',
        items: ['Samsung', 'Xiaomi', 'ტელევიზორის საყრდები', 'TV Soundbar', 'ყველას ნახვა']
      },
      {
        title: 'TV Stick',
        items: ['Xiaomi TV', 'Apple TV', 'Amazon Fire TV Stick', 'ყველას ნახვა']
      },
      {
        title: 'მონიტორები',
        items: ['Acer', 'DELL', 'BenQ', 'Lenovo', 'AOC', 'HP', 'MSI', 'Philips', 'Xiaomi', 'ყველას ნახვა']
      },
      {
        title: 'საქნირ აქსესუარები',
        items: ['Wi-Fi როუტერები', 'ელავმცნები', 'დმენის დამაბრელელი', 'LAN კაბელები', 'HDMI კაბელები', 'მონიტორის განათება', 'RGB განათება', 'მონიტორის საჩრდილები', 'ყველას ნახვა']
      }
    ],
    bottom: [
      {
        title: 'პროექტორები',
        items: ['Samsung', 'Xiaomi', 'Wanbo', 'Anker', 'Acer', 'BenQ', 'ყველას ნახვა']
      },
      {
        title: 'პროექტორის აქსესუარები',
        items: ['პროექტორის დასადგმი', 'პროექტორის Tripod', 'პროექტორები', 'პროექტორის ჩანთა', 'ყველას ნახვა']
      },
      {
        title: '',
        items: []
      },
      {
        title: '',
        items: []
      }
    ]
  },
  photo: {
    columns: [
      {
        title: 'ფოტოაპარატები',
        items: ['Canon', 'Nikon', 'Sony', 'ყველას ნახვა']
      },
      {
        title: 'სმარტ საათების',
        items: ['Ray-Ban Meta']
      },
      {
        title: 'Power banks',
        items: ['Anker', 'Ugreen', 'Xiaomi', 'ყველას ნახვა']
      },
      {
        title: 'ფოტო | ვიდეო აქსესუარები',
        items: ['ობიექტივები | ლინზა', 'Gimbal სტაბილიზატორები', 'Speedlite განათებები', 'მხუმარები', 'უსაფენო მიკროფონები', 'ფოტოაპარატის ჩანთები', 'შემსრებების ბარათები', 'ყველას ნახვა']
      }
    ],
    bottom: [
      {
        title: 'ექშვნ კამერები',
        items: ['GoPro', 'DJI Osmo', 'Insta360', 'აქსესუარები', 'ყველას ნახვა']
      },
      {
        title: 'დროუნ პრინტერები',
        items: ['Canon', 'Xiaomi', 'Polaroid', 'Fujifilm', 'აქსესუარები', 'ყველას ნახვა']
      },
      {
        title: 'Smartphone ფოტოგრაფია',
        items: ['სტაბილატორები', 'ლავალეინ მიკროფონები', 'Tripod | სელფის კორი', 'ყველას ნახვა']
      },
      {
        title: 'დრონები',
        items: ['DJI დრონები', 'ყველას ნახვა']
      }
    ]
  },
  smart: {
    columns: [
      {
        title: 'საზარურელი',
        items: ['ჩაილატი', 'ნვემსაცური', 'იზნელეები დალეუ', 'თემბრი', 'ბლუზოები', 'ყველას პარბი', 'ავირდული', 'თოსდეთი', 'ყველას ნახვა']
      },
      {
        title: 'კლიმატის მართვა',
        items: ['ჰაერის განმწმენდი', 'ჰაერის დამატბენისაკოდელი', 'საქროს აქსესუარები', 'ყველას ნახვა']
      },
      {
        title: 'სმარტ გადარები',
        items: ['ტვმავირი წანთეები', 'დღამვარბს იქსპეკები', 'საქროს კაბელი', 'RGB განათება', 'ყველას ნახვა']
      },
      {
        title: 'მონიტორინგა',
        items: ['IP კამერა', 'Doorbell', 'კარის ჭკვიანი საკეთები', 'ყველას ნახვა']
      }
    ],
    bottom: [
      {
        title: 'სმარტ განათება',
        items: ['სმარტის ნათურები', 'ნველის ნაბოსები', 'შენათური ღაბალური მოვლა', 'ყველას ნახვა']
      },
      {
        title: 'სმარტ გადაადლელა',
        items: ['სვეთები', 'სვეთებუწ სანაკი', 'დანაბრი', 'RGB განათება', 'ყველას ნახვა']
      },
      {
        title: '',
        items: []
      },
      {
        title: '',
        items: []
      }
    ]
  }
};

/* ---------------- SIDEBAR ---------------- */

function arraytohtml(data) {
  const createList = items =>
    items.map(item => `<li><a href="#">${item}</a></li>`).join('');

  const columns = data.columns.map(col => `
    <div class="mega-menu-column">
      <h3>${col.title}</h3>
      <ul>${createList(col.items)}</ul>
      ${
        col.sections
          ? col.sections.map(sec => `
              <h3 class="mt-section">${sec.title}</h3>
              <ul>${createList(sec.items)}</ul>
            `).join('')
          : ''
      }
    </div>
  `).join('');

  const bottom = data.bottom
    ? `
      <div class="mega-menu-bottom">
        ${data.bottom.map(sec => `
          <div class="mega-menu-bottom-section">
            ${sec.title ? `<h3>${sec.title}</h3>` : ''}
            ${sec.items.length ? `<ul>${createList(sec.items)}</ul>` : ''}
          </div>
        `).join('')}
      </div>
    `
    : '';

  return `<div class="mega-menu-content">${columns}</div>${bottom}`;
}

const menucon = document.getElementById("mega-menu-container");
const sideitems = document.querySelectorAll(".side-item[data-menu]");

if (menucon && sideitems.length) {
  const hoveron = () =>
    Array.from(sideitems).some(item => item.matches(":hover"));

  sideitems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      const key = item.getAttribute("data-menu");
      const data = megaMenuData[key];

      if (!data) return;

      menucon.innerHTML = arraytohtml(data);
      menucon.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!menucon.matches(":hover") && !hoveron()) {
          menucon.classList.remove("active");
        }
      }, 100);
    });
  });

  menucon.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!hoveron()) {
        menucon.classList.remove("active");
      }
    }, 100);
  });
}
