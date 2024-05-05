/* eslint-disable no-irregular-whitespace */
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import SignatureCanvas from "react-signature-canvas";
import { v4 as uuidv4 } from "uuid";
import {
  Page,
  Text,
  Image,
  Document,
  Font,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import rubikFont from "./fonts/Rubik-Bold.ttf";
import rubikReg from "./fonts/Rubik-Medium.ttf";
import exterminatorSign from "./assets/sign.png";
import Section from "./ui/Section";
import "./index.css";
import MiniForm from "./ui/MiniForm";

Font.register({
  family: "Rubik",
  fonts: [
    { src: rubikReg },
    {
      src: rubikFont,
      fontWeight: "bold",
    },
  ],
  format: "truetype",
});
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Rubik",
  },
  title: {
    fontSize: 16,
    textDecoration: "underline",
    textAlign: "center",
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "right",
    marginBottom: 7,
    marginTop: 7,
  },
  text: {
    marginTop: 2,
    marginBottom: 10,
    fontSize: 10,
    textAlign: "right",
    lineHeight: 1.7,
  },
  image: {
    marginVertical: 5,
    marginHorizontal: 5,
    width: 60,
  },
  header: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  headerSection: {
    marginVertical: 10,
    fontSize: 10,
    textAlign: "center",
    color: "grey",
  },
  time: {
    fontSize: 10,
    position: "absolute",
    top: 10,
    left: 10,
    color: "grey",
  },
  id: {
    fontSize: 10,
    position: "absolute",
    top: 10,
    right: 10,
    color: "grey",
  },
  section: {
    position: "absolute",
    display: "flex",
    left: 30,
    bottom: 30,
    margin: 5,
  },
  exterminatorSec: {
    position: "absolute",
    display: "flex",
    right: 30,
    bottom: 30,
    margin: 5,
  },
  customerSign: {
    textAlign: "center",
    fontSize: 12,
    borderTop: 1,
    borderColor: "black",
  },
  info: {
    margin: 5,
  },
  emergancy: {
    position: "absolute",
    bottom: 10,
    left: 120,
    fontSize: 10,
    color: "grey",
  },
});

function App() {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.time}>
          {date} {time}
        </Text>
        <Text style={styles.id}>{` ` + formId} :מספר מסמך</Text>
        <Text style={{ fontFamily: "Rubik" }}></Text>
        <View style={styles.headerSection}>
          <Text>{exterminatorInfo.companyName}</Text>
          <Text>{exterminatorInfo.atarName}</Text>
          <Text>{exterminatorInfo.atarEmail}</Text>
          <Text>
            {exterminatorInfo.atarPhone} | {exterminatorInfo.tel}
          </Text>
        </View>
        <Text style={styles.title}>הנדון: אישור ביצוע הדברה</Text>
        <View style={styles.info}>
          <Text style={styles.subtitle}>:להלן פרטי הלקוח</Text>
          <Text style={styles.text}>
            {`שם הלקוח: ${customerInfo.name}
          סוג הלקוח: ${
            customerInfo.job.includes("לקוח")
              ? customerInfo.job
              : `לקוח ${customerInfo.job}`
          }
          מספר פלאפון: ${customerInfo.phone}
          ${customerInfo.email} :אימייל
          מקום ביצוע העבודה: ${customerInfo.location}
          `}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.subtitle}>:פירוט הממצאים</Text>
          <Text style={styles.text}>{`המזיקים שנמצאו: ${insectsInfo.insectsType}
          רמת הנגיעות: ${insectsInfo.infectionLevel}
          פעולות מניעה: ${insectsInfo.preIdent}
          פעולות שבוצעו: ${insectsInfo.preAction}
          `}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.subtitle}>:פירוט דרכי הטיפול והחומרים</Text>
          <Text
            style={styles.text}
          >{`שם תכשיר ההדברה: ${productInfo.productName}
           ${productInfo.activeMaterialName} :שם החומר הפעיל
          ריכוז החומר הפעיל: ${productInfo.activeMaterialLevel}
          ריכוז החומר הפעיל לאחר דילול: ${productInfo.activeMaterialDilution}
          שיטת ביצוע ההדברה: ${productInfo.applicationMethod}
          
          :אזהרות שניתנו ללקוח בדבר הסיכונים הכרוכים בהדברה ${warnings}
          `}</Text>
        </View>
        <Text style={styles.emergancy}>
          מספר הטלפון להתייעצות בנושאי הרעלות חדות (אקוטיות) הוא 04-7771900, 24
          שעות ביממה
        </Text>
        <View style={styles.section}>
          <Image style={styles.image} src={url} />
          <Text style={styles.customerSign}>חתימת הלקוח</Text>
        </View>
        <View style={styles.exterminatorSec}>
          <Image style={styles.image} src={exterminatorSign} />
          <Text style={styles.customerSign}>חתימת המבצע</Text>
        </View>
      </Page>
    </Document>
  );

  function getTime() {
    return new Date().toLocaleString("en-GB").slice(12, -3);
  }
  const formId = uuidv4();
  const [isLoading, setIsLoading] = useState(false);
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();
  const [date, setDate] = useState("");
  const [warnings, setWarnings] = useState("");
  const [time, setTime] = useState(getTime());
  const customers = [
    {
      custName: "ביצי הר מירון שיווק",
      custPhone: `054-6534633`,
      custType: "לקוח עסקי",
      custEmail: ``,
      custLoc: `מפעל`,
      custAddress: `כפר-חושן/ספסופה`,
    },
    {
      custName: "בת-יער",
      custPhone: "",
      custType: "לקוח עסקי",
      custEmail: ``,
      custLoc: `פנים וחוץ`,
      custAddress: `מצפה עמוקה, ד.נ. מרום גליל, 1380200`,
    },
    {
      custName: "מכללת צפת",
      custPhone: "050-7328567",
      custType: "לקוח עסקי",
      custEmail: ``,
      custLoc: `מכללה פנים וחוץ`,
      custAddress: `ירושלים 11, צפת, 1320611`,
    },
    {
      custName: "המקומות הקדושים",
      custPhone: "052-2855119",
      custType: "לקוח עסקי",
      custEmail: ``,
      custLoc: `קברי צדיקים`,
    },
    {
      custName: "מיטרוניקס",
      custPhone: "052-6512579",
      custType: "לקוח עסקי",
      custEmail: `daniel.dayan@maytronics.com`,
      custLoc: `מפעל`,
      custAddress: `פארק תעשיות רמת דלתון, דלתון`,
    },
    {
      custName: 'מ.ל.א. גידול ושיווק בצים בע"מ',
      custPhone: "052-6512579",
      custType: "לקוח עסקי",
      custEmail: `0522812028m@gmail.com`,
      custLoc: `מפעל`,
      custAddress: `דלתון 15, דלתון`,
    },
  ];
  const exterminatorInfo = {
    companyName: "המבצע",
    atarName: "בנימין עטר",
    licenseType: "מבנים ושטח פתוח",
    licenseNum: 676,
    tel: "04-6972481",
    atarPhone: "050-5439084",
    atarEmail: "atarb@012.net.il",
  };
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    job: "",
    location: "",
    address: "",
    email: "",
    fullFilled: false,
  });
  const [insectsInfo, setInsectsInfo] = useState({
    insectsType: "",
    infectionLevel: "",
    preIdent: "",
    preAction: "",
    fullFilled: true,
  });

  const [productInfo, setProductInfo] = useState({
    productName: "",
    activeMaterialName: "",
    activeMaterialLevel: "",
    activeMaterialDilution: "0",
    applicationMethod: "",
    liters: "",
    fullFilled: true,
  });

  function handleName(e) {
    const customer = customers.find((cust) => cust.custName === e.target.value);

    setCustomerInfo({
      ...customerInfo,
      name: e.target.value,
      phone: customer?.custPhone ? customer?.custPhone : "",
      email: customer?.custEmail ? customer?.custEmail : "",
      job: customer?.custType ? customer?.custType : "",
      location: customer?.custLoc ? customer?.custLoc : "",
      address: customer?.custAddress ? customer?.custAddress : "",
    });
  }
  function handlePhone(e) {
    setCustomerInfo({ ...customerInfo, phone: e.target.value });
  }
  function handleJob(e) {
    setCustomerInfo({ ...customerInfo, job: e.target.value });
  }
  function handleLocation(e) {
    setCustomerInfo({ ...customerInfo, location: e.target.value });
  }
  function handleAddress(e) {
    setCustomerInfo({ ...customerInfo, address: e.target.value });
  }
  function handleEmail(e) {
    setCustomerInfo({ ...customerInfo, email: e.target.value });
  }
  function handleIscType(e) {
    setInsectsInfo({ ...insectsInfo, insectsType: e });
  }
  function handleInfLevel(e) {
    setInsectsInfo({ ...insectsInfo, infectionLevel: e.target.value });
  }
  function handlePreIdent(e) {
    setInsectsInfo({ ...insectsInfo, preIdent: e.target.value });
  }
  function handlePreAction(e) {
    setInsectsInfo({ ...insectsInfo, preAction: e.target.value });
  }

  async function handlePest(e) {
    setProductInfo({ ...productInfo, productName: e.target.value });
  }

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        if (productInfo.productName.length <= 1) return;
        const res = await fetch(
          `https://data.gov.il/api/3/action/datastore_search?resource_id=2d741cd4-9c54-492c-8607-933deddb3094&q=${productInfo.productName}&limit=1`
        );
        if (!res.ok) throw new Error("Could not get the data...");
        const data = await res.json();

        const justifyData = data.result.records[0]["חומרים פעילים"]
          .split(" ")
          .map((element) => {
            return /^[A-Za-z]+$/.test(element)
              ? element
              : element.includes("%")
              ? +element.split("%")[0]
              : null;
          });
        const dataToUse = justifyData.filter((el) => el !== null).sort();
        const activeNums = dataToUse
          .map((el) => (/^(?:0|[1-9]\d*)(\.\d+)?$/.test(el) ? el : ""))
          .filter((el) => el !== "")
          .sort((a, b) => b - a)
          .join(", ");
        const activeNames = dataToUse
          .map((el) => (typeof el === "string" ? el : ""))
          .filter((el) => el !== "")
          .join(", ");

        setProductInfo({
          ...productInfo,
          activeMaterialName: activeNames,
          activeMaterialLevel: activeNums,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, [productInfo.productName]);

  useEffect(() => {
    if (!productInfo.activeMaterialName) {
      return;
    }

    setProductInfo({
      ...productInfo,
      activeMaterialDilution:
        productInfo.liters < 1
          ? productInfo.activeMaterialLevel
          : productInfo.activeMaterialLevel
              .split(", ")
              .map((el) => +((+el * 10) / +productInfo.liters / 10).toFixed(2))
              .join(", "),
    });
  }, [productInfo.activeMaterialName, productInfo.liters, productInfo]);

  function handleMetName(e) {
    setProductInfo({ ...productInfo, activeMaterialName: e.target.value });
  }
  function handleMetLevel(e) {
    setProductInfo({ ...productInfo, activeMaterialLevel: e.target.value });
  }
  function handleMetDilu(e) {
    setProductInfo({ ...productInfo, activeMaterialDilution: e.target.value });
  }
  function handleAppMethod(e) {
    setProductInfo({ ...productInfo, applicationMethod: e.target.value });
  }
  function handleLiters(e) {
    setProductInfo({
      ...productInfo,
      liters: +e.target.value,
    });
  }
  function handleSignature(e) {
    e.preventDefault();
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
    setProductInfo({ ...productInfo, fullFilled: true });
  }
  function handleClear(e) {
    e.preventDefault();
    sign.clear();
    setUrl("");
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    setWarnings(
      insectsInfo.insectsType !== "מכרסמים"
        ? `
   *.כניסה לבית אחרי מינימום 3 שעות*
   *.אין לאפשר לילדים לזחול ברצפה במשך 4 ימים*
   *.אין לתת בעלי חיים להסתובב באזור שרוסס למשך 4 ימים*
`
        : `
  *.אין לפתוח את תיבות ההאכלה*
  *.במידה והקופסה נפתחה מסיבה כלשהי אין לגעת בחומר ההדברה ויש ליצור קשר עם המדביר*
  *.אין להזיז את התיבות האכלה משום סיבה שהיא*
`
    );
  }, [insectsInfo.insectsType]);

  function handleSendEmail(e) {
    e.preventDefault();
    const data = {
      date,
      time,
      warnings,
      ...exterminatorInfo,
      ...customerInfo,
      ...insectsInfo,
      ...productInfo,
    };

    emailjs
      .send("service_79jcv5o", "template_z4bqghh", data, "8Y_vlfaDQ5FXMqt_8")
      .then(
        (result) => {
          alert("נשלח בהצלחה, לא לשכוח ללחוץ על כפתור ההורדה");
        },
        (error) => {
          alert(
            "לא הצלחנו לשלוח את הטופס ללקוח, לא לשכוח ללחוץ על כפתור ההורדה!"
          );
        }
      );
  }
  function handleProceed(e, from) {
    e.preventDefault();

    switch (from) {
      case "customer":
        setCustomerInfo({ ...customerInfo, fullFilled: true });
        setInsectsInfo({ ...insectsInfo, fullFilled: false });

        break;

      case "insects":
        setInsectsInfo({ ...insectsInfo, fullFilled: true });
        setProductInfo({ ...productInfo, fullFilled: false });

        break;

      default:
        break;
    }
  }

  return (
    <form className="p-2 my-0 mx-auto font-sans" onSubmit={handleSubmit}>
      <input type="hidden" name="image_url" value={url} />
      {!customerInfo.fullFilled && (
        <>
          <Section>
            <MiniForm title="שם המזמין:">
              <input
                list="customers-list"
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="name"
                placeholder="שם מלא"
                onChange={(e) => handleName(e)}
                value={customerInfo.name}
              />
              <datalist id="customers-list">
                {customers.map((customer) => (
                  <option key={customer.custName}>{customer.custName}</option>
                ))}
              </datalist>
            </MiniForm>
            <MiniForm title="מספר פלאפון:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="phone"
                name="phone"
                onChange={(e) => handlePhone(e)}
                value={customerInfo.phone}
              />
            </MiniForm>
            <MiniForm title="תפקיד:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="job"
                placeholder="לקוח פרטי / עסקי וכו'"
                onChange={(e) => handleJob(e)}
                value={customerInfo.job}
              />
            </MiniForm>
            <MiniForm title="מקום הביצוע:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="location"
                value={customerInfo.location}
                onChange={(e) => handleLocation(e)}
                placeholder="דירה / מפעל / שטח פתוח וכו'"
              />
            </MiniForm>
            <MiniForm title="כתובת:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="address"
                placeholder="הנשיא 33, צפת"
                onChange={(e) => handleAddress(e)}
                value={customerInfo.address}
              />
            </MiniForm>
            <MiniForm title="אימייל:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="email"
                onChange={(e) => handleEmail(e)}
                value={customerInfo.email}
              />
            </MiniForm>
            <MiniForm title="תאריך ביצוע:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </MiniForm>
            <MiniForm title="שעת ביצוע:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="time"
                name="time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
              />
            </MiniForm>
          </Section>
          <button
            className="w-full border-2"
            onClick={(e) => handleProceed(e, "customer")}
          >
            המשך
          </button>
        </>
      )}
      {!insectsInfo.fullFilled && (
        <>
          <Section>
            <MiniForm title="סוג המזיקים:">
              <select
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="insects-type"
                onChange={(e) => {
                  handleIscType(e.target.value);
                }}
                value={insectsInfo.insectsType}
                required
              >
                <option value="" disabled hidden>
                  נא לבחור
                </option>
                <option value="תיקנים ונמלים">תיקנים ונמלים</option>
                <option value="מכרסמים">מכרסמים</option>
                <option value="עקרבים ונדלים">עקרבים ונדלים</option>
                <option value="כלל המזיקים">תיקנים,נמלים,עקרבים וכו'</option>
              </select>
            </MiniForm>
            <MiniForm title="רמת הנגיעות:">
              <select
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="infection-level"
                value={insectsInfo.infectionLevel}
                onChange={(e) => handleInfLevel(e)}
                required
              >
                <option value="" disabled hidden>
                  נא לבחור
                </option>
                <option value="גבוהה">גבוהה</option>
                <option value="בינונית">בינונית</option>
                <option value="נמוכה">נמוכה</option>
              </select>
            </MiniForm>
            <MiniForm title="פעולות זיהוי:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="pre-ident"
                onChange={(e) => handlePreIdent(e)}
                value={insectsInfo.preIdent}
              />
            </MiniForm>
            <MiniForm title="פעולות מקדימות:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="pre-action"
                onChange={(e) => handlePreAction(e)}
                value={insectsInfo.preAction}
              />
            </MiniForm>
          </Section>
          {insectsInfo.insectsType !== "" &&
          insectsInfo.infectionLevel !== "" ? (
            <button
              className="w-full border-2"
              onClick={(e) => handleProceed(e, "insects")}
            >
              המשך
            </button>
          ) : null}
        </>
      )}

      {!productInfo.fullFilled && (
        <>
          <Section>
            <MiniForm title="שם החומר:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                list="pesticide-data"
                name="pesticide"
                onChange={(e) => handlePest(e)}
                value={productInfo.productName}
              />
              <datalist id="pesticide-data">
                <option value=""></option>
              </datalist>
            </MiniForm>

            <MiniForm title="כמות מים לדילול:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="liters"
                onChange={(e) => handleLiters(e)}
                value={productInfo.liters}
              />
            </MiniForm>
            <MiniForm title="שם החומר הפעיל:">
              <input
                disabled
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="active-material-name"
                onChange={(e) => handleMetName(e)}
                value={
                  isLoading ? "טוען נתונים..." : productInfo.activeMaterialName
                }
              />
            </MiniForm>
            <MiniForm title="ריכוז חומר פעיל:">
              <input
                required
                disabled
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="active-material-level"
                onChange={(e) => handleMetLevel(e)}
                value={
                  isLoading ? "טוען נתונים..." : productInfo.activeMaterialLevel
                }
              />
            </MiniForm>
            <MiniForm title="ריכוז לאחר דילול:">
              <input
                required
                disabled
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="active-after-dilution"
                onChange={(e) => handleMetDilu(e)}
                value={
                  isLoading
                    ? "טוען נתונים..."
                    : productInfo.activeMaterialDilution
                }
              />
            </MiniForm>
            <MiniForm title="שיטת ביצוע ההדברה:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                placeholder="לדוג': מרסס גב בהתזה לגובה של 40 סמ' מקס'"
                name="method-of-application"
                onChange={(e) => {
                  handleAppMethod(e);
                }}
                value={productInfo.applicationMethod}
              />
            </MiniForm>
          </Section>

          <div>
            <h3 className="font-semibold">חתימה הלקוח:</h3>
            <div className="border-2 w-full overflow-hidden">
              <SignatureCanvas
                ref={(data) => setSign(data)}
                penColor="black"
                canvasProps={{
                  width: 1600,
                  height: 300,
                  className: "sigCanvas",
                }}
              />
            </div>
            <div className="font-semibold my-2 mx-2 flex items-center justify-end">
              <button className="mx-5 " onClick={handleClear}>
                נסה שוב
              </button>
              <button
                type="submit"
                className="px-2 py-1 rounded-md border-2 border-slate-200 bg-slate-200 hover:bg-slate-300 transition-colors duration-200 hover:scale-105"
                onClick={(e) => {
                  handleSignature(e), handleSendEmail(e);
                }}
              >
                אשר חתימה
              </button>
            </div>
          </div>
        </>
      )}
      {url ? (
        <>
          <PDFDownloadLink
            className="px-2 py-1 cursor-pointer rounded-md border-2 border-slate-100 bg-slate-100 hover:bg-slate-300 transition-colors duration-150 hover:scale-105"
            document={<MyDocument />}
            fileName={`אישור ביצוע עבור ${customerInfo.name}, בתאריך:${time} בשעה:${date}`}
          >
            להורדת המסמך לחץ כאן
          </PDFDownloadLink>
        </>
      ) : null}
    </form>
  );
}

export default App;
