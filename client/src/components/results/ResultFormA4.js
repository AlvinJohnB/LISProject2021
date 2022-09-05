import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import Moment from 'moment'
import arialbd from '../../fonts/arialbd.ttf'
import logo from '../../images/stcamlogo.jpg'
import lablogo from '../../images/lablogo.jpg'

Font.register({ family: 'arialbd', src: arialbd, fontStyle: 'normal', fontWeight: 'bold' });

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 15,
    paddingBottom: 100,
    paddingHorizontal: 35,
    alignItems: 'center'
  },
header:{
    width: 575.28,
    height: 120,
    marginBottom: "5px"
  },
  wrap:{
    width: 575.28,
  },
companyHeader:{
    width: 575.28,
    marginBottom: "10px"
  },
  companyHText:{
    fontSize: '16px',
    textAlign: 'center'
  },
  contactText:{
    textAlign: 'center',
    fontSize: '8px'
  },
  marginTop:{
    marginTop: 2,
  },
  patientHeader:{
    flex: 1,
    flexDirection: 'row',
    width: 575.28,
    paddingLeft: '10px',
  },
  pcol:{
    width: 350,
  },
  pcol1:{
    width: 200,
  },
  patientInfoText:{
    fontSize: '10px',
  },
  resultBody:{
    width: 575.28,
    paddingLeft: '10px',
  },
  resultHeader:{
    fontFamily: 'Helvetica-Bold',
    fontSize: '11px',
    fontWeight: 'bold',
    width: 575.28
  },
  footer:{
    width: 575.28,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 29,
  },
  footerCol:{
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerCol1:{
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText:{
    fontSize: '9px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerMessage:{
    position: 'absolute',
    fontSize: '9px',
    textAlign: 'center',
    fontWeight: 'bold',
    bottom: 29,
  },
  resTable:{
    width: 555.28,
  },
  resHText:{
    fontFamily: 'Helvetica-Bold',
    fontSize: '10px',
    width: 130,
    textAlign: 'center',
    borderBottom: '1px dotted black',
    borderTop: '1px dotted black',
    padding: 5
  },
  testNameHeader:{
    fontFamily: 'Helvetica-Bold',
    fontSize: '10px',
    fontWeight: 'bold',
    width: 200,
    textAlign: 'center',
    borderBottom: '1px dotted black',
    borderTop: '1px dotted black',
    padding: 5
  },
  tableHeader:{
    width: 560.28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resTr:{
    width: 560.28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "2px",
    marginBottom: "2px"
  },
   body:{
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
},
testName:{
  fontSize: '10px',
  width: 170,
  padding: 2
},
trCenter:{
  fontSize: '10px',
  width: 130,
  padding: 2,
  textAlign: 'center',
},
trCenterBold:{
  fontFamily: 'Helvetica-Bold',
  fontSize: '11px',
  width: 200,
  padding: 2,
  textAlign: 'center',
},
logo:{
  width: "55px",
  position: 'absolute',
  left: "40px"
},
lablogo:{
  width: "55px",
  position: 'absolute',
  right: "40px",
},
signature:{
  fontFamily: 'arial',
  fontSize: '10px',
},
signaturePatho:{
  fontFamily: 'arial',
  fontSize: '10px',
},
result:{
  width: 300
}
});

// Create Document Component
const ResultFormA4 = (props) => {
  return(
  <Document>
    <Page size="LETTER" orientation= "portrait" style={styles.page}>
      <View style={styles.wrap}>
        <View fixed={true} style={styles.header}>
          <View style={styles.companyHeader}>
            <Image src={logo} style={styles.logo} fixed={true}/>
            <Image src={lablogo} style={styles.lablogo} fixed={true}/>
            <Text style={styles.companyHText}>St. Camillus De Lellis General Hospital</Text>
            <Text style={styles.companyHText}>Laboratory Department</Text>
            <Text style={styles.contactText}>Gomburza cor. Z. Flores Sts. Brgy. 6 San Agustin, Laoag City</Text>
            <Text style={styles.contactText}>Cellphone No.: 0961 366 8271 | Telephone No.: 600-1125 | e-mail: st.camillusdelellislab@yahoo.com</Text>
            <Text style={[styles.companyHText, styles.marginTop]}>Laboratory Report</Text>
          </View>
          <View style={styles.patientHeader}>
            <View style={styles.pcol}>
              <Text style={styles.patientInfoText}>Patient Name: {props.data.Patientlists[0].lastname}, {props.data.Patientlists[0].firstname} {props.data.Patientlists[0].middlename}</Text>
              <Text style={styles.patientInfoText}>Age/Gender: {props.data.Patientlists[0].age} / {props.data.Patientlists[0].gender}</Text>
              <Text style={styles.patientInfoText}>Requesting Physician: {props.data.reqDr}</Text>
            </View>

            <View style={styles.pcol1}>
              <Text style={styles.patientInfoText}>Date: {Moment(props.data.createdAt).format('MMMM DD, yyyy')}</Text>
              <Text style={styles.patientInfoText}>Paitent Type/Room: {props.data.ptType}</Text>
              <Text style={styles.patientInfoText}>Laboratory Number: {props.data.labNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.resultBody}>
          <Text fixed={true} style={styles.resultHeader}>Section: {props.data.Sectionorders[0].section === "CM" ? `Clinical Microscopy` : props.data.Sectionorders[0].section}</Text>
          
          <View style={styles.resTable}>
            
            <View style={styles.tableHeader} fixed={true}>
                <Text style={styles.testNameHeader}>Test Name</Text>
                <Text style={[styles.resHText, styles.result]}>Result</Text>
                <Text style={styles.resHText}>Unit</Text>
                <Text style={styles.resHText}>Reference</Text>
            </View>
            {props.data.Sectionorders[0].Sectionresults.map((result, index) => {
                return(
                    <View key={index}>
                    {result.result === "!" || result.result === null ?  <View></View> : <View wrap={false} style={styles.resTr}>
                     {result.Testslist.isPackage === true && <Text style={styles.trCenterBold}>{result.Testslist.testname}</Text>}
                     {result.Testslist.isPackage === false && <Text style={styles.testName}>{result.Testslist.testname}</Text>}
                    <Text style={[styles.trCenter, styles.result]}>{result.result}</Text>
                    {result.Testslist.isPackage === true && <Text style={styles.trCenter}></Text>}
                    {result.Testslist.isPackage === false && <Text style={styles.trCenter}>{result.Testslist.unit}</Text>}
                    {result.Testslist.Referencevalue == null &&  <Text style={styles.trCenter}></Text>}
                    {result.Testslist.Referencevalue !== null && props.data.Patientlists[0].gender === "Male" && <Text style={styles.trCenter}>{result.Testslist.Referencevalue.Male}</Text>}
                    {result.Testslist.Referencevalue !== null && props.data.Patientlists[0].gender === "Female" && <Text style={styles.trCenter}>{result.Testslist.Referencevalue.Female}</Text>}
                </View>}
                    </View>)
            })}

          </View>
          
        </View>
      
      
      
      
        </View>
         <View fixed={true} style={styles.footer}>
         <View style={styles.footerCol}>
            {/* IMAGE HERE FOR RMT */}
            <Text style={styles.signature} fixed={true}>{props.data.Sectionorders[0].releasedBy}</Text>
            <Text style={styles.footerText}>REGISTERED MEDICAL TECHNOLOGIST</Text>
            <Text style={styles.footerText}>License No.: ______</Text>
          </View>

          <View style={styles.footerCol1}>
          <Text style={styles.signaturePatho} fixed={true}>{props.data.Sectionorders[0].pathologist}</Text>
          <Text style={styles.footerText}>ANATOMIC AND CLINICAL PATHOLOGIST</Text>
          <Text style={styles.footerText}>License No.: 98717</Text>
          </View>
        </View>
    </Page>
      
  </Document>
)
};

export default ResultFormA4;
