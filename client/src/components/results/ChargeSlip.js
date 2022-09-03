import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import Moment from 'moment'
import arialbd from '../../fonts/arialbd.ttf'
import arial from '../../fonts/arial.ttf'
import logo from '../../images/stcamlogo.jpg'
Font.register({ family: 'arialbd', src: arialbd, fontStyle: 'normal', fontWeight: 'bold' });
Font.register({ family: 'arial', src: arial, fontStyle: 'normal', fontWeight: 'normal' });

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
    height: 100
  },
  wrap:{
    width: 575.28,
  },
companyHeader:{
    width: 575.28,
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
    fontFamily: 'arialbd',
    fontSize: '11px',
    fontWeight: "bold",
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
    fontFamily: 'arialbd',
    fontSize: '10px',
    fontWeight: 'bold',
    width: 130,
    textAlign: 'center',
    borderBottom: '1px dotted black',
    borderTop: '1px dotted black',
    padding: 5
  },
  testNameHeader:{
    fontFamily: 'arialbd',
    fontSize: '10px',
    fontWeight: 'bold',
    width: 170,
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
  },
   body:{
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
},
testName:{
  fontSize: '10px',
  fontWeight: 'bold',
  width: 170,
  padding: 2
},
trCenter:{
  fontSize: '10px',
  fontWeight: 'bold',
  width: 130,
  padding: 2,
  textAlign: 'center',
},
trCenterBold:{
  fontFamily: 'arialbd',
  fontSize: '10px',
  fontWeight: 'bold',
  width: 130,
  padding: 2,
  textAlign: 'center',
},
logo:{
  width: "55px",
  position: 'absolute',
  left: "80px"
},
signature:{
  fontFamily: 'arial',
  fontSize: '10px',
},
signaturePatho:{
  fontFamily: 'arial',
  fontSize: '10px',
}
});

// Create Document Component
const ChargeSlip = (props) => {
  return(
  <Document>
    <Page size="A5" orientation= "landscape" style={styles.page}>
      <View style={styles.wrap}>
        <View fixed={true} style={styles.header}>
          <View style={styles.companyHeader}>
            <Image src={logo} style={styles.logo} fixed={true}/>
            <Text style={styles.companyHText}>St. Camillus De Lellis General Hospital</Text>
            <Text style={styles.companyHText}>Laboratory Department</Text>
            <Text style={styles.contactText}>Telephone No.: 600-1125  |  e-mail: st.camillusdelellislab@yahoo.com</Text>
            <Text style={[styles.companyHText, styles.marginTop]}>Charge Slip</Text>
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
          <Text fixed={true} style={styles.resultHeader}></Text>
          
          <View style={styles.resTable}>
            
            <View style={styles.tableHeader} fixed={true}>
                <Text style={styles.testNameHeader}>PARTICULARS</Text>
                <Text style={styles.resHText}></Text>
                <Text style={styles.resHText}></Text>
                <Text style={styles.resHText}>Cost</Text>
            </View>
      
            <View style={styles.resTr}>
                  {props.data.chemCost !== 0 && <Text>Chemistry</Text>}
                  {props.data.chemCost !== 0 && <Text>{props.data.chemCost}</Text>}
            </View>
            {/* {props.data.Sectionorders[0].Sectionresults.map((result, index) => {
                return(
                    <View key={index}>
                    {result.result === "!" || result.result === null ?  <View></View> : <View wrap={false} style={styles.resTr}>
                     {result.Testslist.isPackage === true && <Text style={styles.trCenterBold}>{result.Testslist.testname}</Text>}
                     {result.Testslist.isPackage === false && <Text style={styles.testName}>{result.Testslist.testname}</Text>}
                    <Text style={styles.trCenter}>{result.result}</Text>
                    {result.Testslist.isPackage === true && <Text style={styles.trCenter}></Text>}
                    {result.Testslist.isPackage === false && <Text style={styles.trCenter}>{result.Testslist.unit}</Text>}
                    {result.Testslist.Referencevalue == null &&  <Text style={styles.trCenter}></Text>}
                    {result.Testslist.Referencevalue !== null && props.data.Patientlists[0].gender === "Male" && <Text style={styles.trCenter}>{result.Testslist.Referencevalue.Male}</Text>}
                    {result.Testslist.Referencevalue !== null && props.data.Patientlists[0].gender === "Female" && <Text style={styles.trCenter}>{result.Testslist.Referencevalue.Female}</Text>}
                </View>}
                    </View>)
            })} */}

          </View>
          
        </View>
      
      
      
      
        </View>
         <View fixed={true} style={styles.footer}>
          <View style={styles.footerCol}>
            <Text style={styles.signature} fixed={true}>{props.data.Sectionorders[0].releasedBy}</Text>
            <Text style={styles.footerText}>REGISTERED MEDICAL TECHNOLOGIST</Text>
          </View>

          {/* <View style={styles.footerCol1} wrap={false}>
          <Text style={styles.signaturePatho} fixed={true}>{props.data.Sectionorders[0].pathologist}</Text>
          <Text style={styles.footerText}>PATHOLOGIST</Text>
          </View> */}
        </View>
    </Page>
      
  </Document>
)
};

export default ChargeSlip;
