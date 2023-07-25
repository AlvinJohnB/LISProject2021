import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Moment from 'moment'
import logo from '../../images/stcamlogo.jpg'
import lablogo from '../../images/lablogo.jpg'

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 450,
    paddingHorizontal: 35,
  },
  header:{
    textAlign: 'center',
  },
  companyText:{
    fontSize: 13,
    fontFamily: 'Helvetica-Bold'
  },
  companyContacts:{
    fontSize: 8
  },
  patientHeader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  column:{
    width: 300,
    marginRight: 20
  },
  column1:{
    width: 200
  },
  patientInfo:{
    fontSize: '11px'
  },
  footerText:{
    fontSize: '10px',
    textAlign: 'center',
  }
  ,
  footer:{
    position: 'absolute',
    bottom: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  resultHeader:{
    borderTop: '1px dotted black',
    borderBottom: '1px dotted black',
    marginTop: 15,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    fontFamily: 'Helvetica-Bold',
    fontSize: '11px'
  },
  
   resultBody:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
     fontSize: '11px'
  },
  testName: {
    width: 175,
    paddingLeft: 15
  },
  resultText:{
    width: 215,
    textAlign: 'center',
  },
  unitText:{
    width: 75,
    textAlign: 'center'
},
  referenceText:{
    width: 90,
    textAlign: 'center'
  },
  sectiontext:{
    fontFamily: 'Helvetica-Bold',
    fontSize: '11px',
  },
logo:{
  width: "55px",
  position: 'absolute',
  left: "10px",
  bottom: "5px"
},
lablogo:{
    width: "55px",
    position: 'absolute',
    right: "10px",
  	bottom: "5px"
},
caps:{
  textTransform: "uppercase"
}
});

// Create Document Component
const FullResultsHalf = (props) => {
  return(
    <Document>
    <Page size="Letter" style={styles.body}>
    <View style={styles.header} fixed={true}>
        <Image src={logo} style={styles.logo}/>
        <Image src={lablogo} style={styles.lablogo}/>
        <Text style={styles.companyText}>St. Camillus De Lellis General Hospital</Text>
        <Text style={styles.companyContacts}>Gomburza cor. Z. Flores Sts. Brgy. 6 San Agustin, Laoag City</Text>
        <Text style={styles.companyContacts}>Cellphone No.: 0961 366 8271 | Telephone No.: 600-1125  |  e-mail: st.camillusdelellislab@yahoo.com</Text>
        <Text style={styles.companyText}>Laboratory Report</Text>   
    </View>
      
      <View style={styles.patientHeader} fixed={true}>
        <View style={styles.column}>
          <Text style={styles.patientInfo}>Patient Name: {props.data.Patientlists[0].lastname}, {props.data.Patientlists[0].firstname} {props.data.Patientlists[0].middlename}</Text>
          <Text style={styles.patientInfo}>Age/Gender: {props.data.Patientlists[0].age} / {props.data.Patientlists[0].gender}</Text>
          <Text style={styles.patientInfo}>Requesting Physician: {props.data.reqDr}</Text>
        </View>
        
        <View style={styles.column1}>
          <Text style={styles.patientInfo}>Date: {Moment(props.data.createdAt).format('MMMM DD, yyyy')}</Text>
          <Text style={styles.patientInfo}>Patient Type/Room No.: {props.data.ptType}</Text>
          <Text style={styles.patientInfo}>Laboratory Number: {props.data.labNumber}</Text>
        </View>
      </View>
      
      
      <View style={styles.resultHeader} fixed={true}>
          <Text style={styles.testName}>Test Name</Text>
          <Text style={styles.resultText}>Result</Text>
          <Text style={styles.unitText}>Unit</Text>
         <Text style={styles.referenceText}>Reference</Text>
      </View>
      

         
         {props.data.Sectionorders.map((section, key) => {
            return(
                <View key={key}>

                    <Text style={[styles.sectiontext, styles.caps]}>{section.section === "CM" ? `Clinical Microscopy` : section.section}</Text>
                    {section.Sectionresults.map((result, index) => {
                      return(
                        <View key={index}>
                          {result.result === "!" || result.result === null ? <View></View> : 
                            <View>
                              {result.Testslist.isPackage === true && <Text style={styles.sectiontext}>{result.Testslist.testname}</Text>}
                              {result.Testslist.isPackage === false && (<View style={styles.resultBody}><Text style={styles.testName}>{result.Testslist.testname}</Text><Text style={styles.resultText}>{result.result}</Text><Text style={styles.unitText}>{result.Testslist.unit}</Text><Text style={styles.referenceText}>{props.data.Patientlists[0].gender === "Male" ? `${result.Testslist.Referencevalue.Male}` : `${result.Testslist.Referencevalue.Female}`}</Text></View>)}
                            </View>}
                        </View>
                      )
                    })}
                {/* {section.Sectionresults.map((result, index) => {
                    return(
                        <View key={index}>
                            {result.result === "!" || result.result === null ?  <View></View> : <View wrap={false}>
                            {result.Testslist.isPackage === true && <View> <Text style={styles.sectiontext}>{result.Testslist.testname}</Text></View>}
                            {result.Testslist.isPackage === false && <View style={styles.resultBody}>
                                                                        <Text style={styles.testName}>{result.Testslist.testname}</Text>
                                                                        <Text style={styles.resultText}>{result.result}</Text>
                                                                        <Text style={styles.unitText}>{result.Testslist.unit}</Text>
                                                                        <Text style={styles.referenceText}>{props.data.Patientlists[0].gender === "Male" ? `${result.Testslist.Referencevalue.Male}` : `${result.Testslist.Referencevalue.Female}`}</Text>
                                                                    </View>}
                            </View>}
                        </View>
                    )
                })} */}
                </View>
            )
         })}
         
     
      
      
      
      
      <View style={styles.footer} fixed={true}>
        <View style={styles.column}>
          <Text style={styles.footerText}>{props.data.Sectionorders[0].releasedBy}</Text>
          <Text style={styles.footerText}>REGISTERED MEDICAL TECHNOLOGIST</Text>
          <Text style={styles.footerText}>License No.: _____</Text>
        </View>
        
        <View style={styles.column}>
          <Text style={styles.footerText}>{props.data.Sectionorders[0].pathologist}</Text>
          <Text style={styles.footerText}>ANATOMIC AND CLINICAL PATHOLOGIST</Text>
          <Text style={styles.footerText}>License No: 98717</Text>
        </View>
      </View>
      
    </Page>
  </Document>
)
};

export default FullResultsHalf;
