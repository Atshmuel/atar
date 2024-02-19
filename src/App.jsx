import { useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
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
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "right",
    marginBottom: 3,
    marginTop: 7,
  },
  text: {
    marginTop: 2,
    marginBottom: 10,
    fontSize: 10,
    textAlign: "right",
  },
  image: {
    marginVertical: 5,
    marginHorizontal: 5,
    width: 70,
  },
  header: {
    fontSize: 13,
    marginBottom: 20,
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
  section: {
    position: "absolute",
    display: "flex",
    left: 30,
    bottom: 20,
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
});

function App() {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.time}>
          {date} {time}
        </Text>
        <Text style={{ fontFamily: "Rubik" }}></Text>
        <Text style={styles.header}>
          {`"${exterminatorInfo.companyName}"
          
          ${exterminatorInfo.name}
          `}
        </Text>
        <Text style={styles.title}>אישור ביצוע הדברה</Text>
        <View style={styles.info}>
          <Text style={styles.subtitle}>להלן פרטי הלקוח</Text>
          <Text style={styles.text}>
            {`שם הלקוח: ${customerInfo.name}
          סוג הלקוח: ${
            customerInfo.job.includes("לקוח")
              ? customerInfo.job
              : `לקוח ${customerInfo.job}`
          }
          מספר פלאפון: ${customerInfo.phone}
          מקום ביצוע העבודה: ${customerInfo.location}
          `}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.subtitle}>פירוט הממצאים</Text>
          <Text style={styles.text}>{`המזיקים שנמצאו: ${insectsInfo.insectsType}
          רמת הנגיעות: ${insectsInfo.infectionLevel}
          פעולות מניעה: ${insectsInfo.preIdent}
          פעולות שבוצעו: ${insectsInfo.preAction}
          `}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.subtitle}>פירוט דרכי הטיפול והחומרים:</Text>
          <Text
            style={styles.text}
          >{`שם תכשיר ההדברה: ${productInfo.productName}
          :שם החומר הפעיל
          ${productInfo.activeMaterialName}
          ריכוז החומר הפעיל: ${productInfo.activeMaterialLevel}
          ריכוז החומר הפעיל לאחר דילול: ${productInfo.activeMaterialDilution}
          שיטת ביצוע ההדברה: ${productInfo.applicationMethod}
          אזהרות שניתנו ללקוח בדבר הסיכונים הכרוכים בהדברה:
          ${productInfo.warnings}
          `}</Text>
        </View>
        {/* <Text style={styles}></Text> */}
        <Text style={styles.text}>
          מספר הטלפון להתייעצות בנושאי הרעלות חדות (אקוטיות) הוא 04-7771900, 24
          שעות ביממה
        </Text>
        <View style={styles.section}>
          <Image style={styles.image} src={url} />
          <Text style={styles.customerSign}>חתימת הלקוח</Text>
        </View>
      </Page>
    </Document>
  );

  function getTime() {
    return new Date().toLocaleString("en-GB").slice(12, -3);
  }
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState(getTime());
  const [exterminatorInfo, setExterminatorInfo] = useState({
    companyName: "המבצע",
    name: "בנימין עטר",
    licenseType: "מבנים ושטח פתוח",
    licenseNum: 676,
    tel: "04-6972481",
    phone: "050-5439084",
    email: "atarb@012.net.il",
    fullFilled: false,
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    job: "",
    location: "",
    address: "",
    fullFilled: true,
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
    warnings: "",
    activeMaterialName: "",
    activeMaterialLevel: "",
    activeMaterialDilution: "",
    applicationMethod: "",
    liters: "",
    fullFilled: true,
  });

  function handleName(e) {
    setCustomerInfo({ ...customerInfo, name: e.target.value });
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
  function handleIscType(e) {
    setInsectsInfo({ ...insectsInfo, insectsType: e.target.value });
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
          .map((el) => (/^(0|[1-9]\d*)$/.test(el) ? el : ""))
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
    if (!productInfo.activeMaterialName || !productInfo.liters) {
      setProductInfo({ ...productInfo, activeMaterialDilution: "" });

      return;
    }

    setProductInfo({
      ...productInfo,
      activeMaterialDilution: productInfo.activeMaterialLevel
        .split(", ")
        .map((el) => +((+el * 10) / +productInfo.liters / 10).toFixed(2))
        .join(", "),
    });
  }, [productInfo.activeMaterialName, productInfo.liters]);
  function handleWarnings(e) {
    setProductInfo({ ...productInfo, warnings: e.target.value });
  }
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
    setProductInfo({ ...productInfo, liters: e.target.value });
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
  function handleProceed(e, from) {
    e.preventDefault();

    switch (from) {
      case "exterminator":
        setExterminatorInfo({ ...exterminatorInfo, fullFilled: true });
        setCustomerInfo({ ...customerInfo, fullFilled: false });
        break;

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
      {!exterminatorInfo.fullFilled && (
        <>
          <Section>
            <MiniForm title="שם המדביר:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                disabled
                value={exterminatorInfo.name}
              />
            </MiniForm>
            <MiniForm title="סוג רישיון:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                disabled
                value={exterminatorInfo.licenseType}
              />
            </MiniForm>
            <MiniForm title="מספר רישיון:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="number"
                disabled
                value={exterminatorInfo.licenseNum}
              />
            </MiniForm>
            <MiniForm title="מספר טלפון:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                disabled
                value={exterminatorInfo.tel}
              />
            </MiniForm>
            <MiniForm title="מספר נייד:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                disabled
                value={exterminatorInfo.phone}
              />
            </MiniForm>
            <MiniForm title="אימייל:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="email"
                disabled
                value={exterminatorInfo.email}
              />
            </MiniForm>
          </Section>
          <button
            className="w-full border-2"
            onClick={(e) => handleProceed(e, "exterminator")}
          >
            המשך
          </button>
        </>
      )}
      {!customerInfo.fullFilled && (
        <>
          <Section>
            <MiniForm title="שם המזמין:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="name"
                placeholder="שם מלא"
                onChange={(e) => handleName(e)}
                value={customerInfo.name}
              />
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
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="insects-type"
                onChange={(e) => {
                  handleIscType(e);
                }}
                value={insectsInfo.insectsType}
              />
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
          <button
            className="w-full border-2"
            onClick={(e) => handleProceed(e, "insects")}
          >
            המשך
          </button>
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
            <MiniForm title="אזהרות בדבר סיכונים כרוכים:">
              <input
                required
                className="px-1 border-2 font-thin text-sm w-44 xs:w-60 sm:w-10/12"
                type="text"
                name="warnings"
                onChange={(e) => handleWarnings(e)}
                value={productInfo.warnings}
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
                className="px-2 py-1 rounded-md border-2 border-slate-200 bg-slate-200 hover:bg-slate-300 transition-colors duration-200 hover:scale-105"
                onClick={handleSignature}
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
