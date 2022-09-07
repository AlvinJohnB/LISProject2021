import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import Moment from 'moment'
import arialbd from '../../fonts/arialbd.ttf'
import logo from '../../images/stcamlogo.jpg'
import lablogo from '../../images/lablogo.jpg'

Font.register({ family: 'arialbd', src: arialbd, fontStyle: 'normal', fontWeight: 'bold' });

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 100,
        paddingHorizontal: 35,
      },
      header:{
        textAlign: 'center',
        marginTop: 15
      },
      companyText:{
        fontSize: 20,
        fontFamily: 'Helvetica-Bold'
      },
      companyContacts:{
        fontSize: 11
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
        fontSize: '12px'
      },
      footerText:{
        fontSize: '12px',
        textAlign: 'center',
      }
      ,
      footer:{
        position: 'absolute',
        bottom: 30,
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
        fontSize: '13px'
      },
      
       resultBody:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
         fontSize: '12px'
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
        width: 75,
        textAlign: 'center'
      },
      sectiontext:{
        fontFamily: 'Helvetica-Bold',
        fontSize: '12px'
      },
    });

// Create Document Component
const FullResults = (props) => {

  
  return(
    <Document>
    <Page size="Letter" style={styles.body}>
      <View style={styles.header} fixed>
          <Text style={styles.companyText}>St. Camillus De Lellis General Hospital</Text>
        <Text style={styles.companyContacts}>Gomburza cor. Z. Flores Sts. Brgy. 6 San Agustin, Laoag City</Text>
        <Text style={styles.companyContacts}>Cellphone No.: 0961 366 8271 | Telephone No.: 600-1125  |  e-mail: st.camillusdelellislab@yahoo.com</Text>
        <Text style={styles.companyText}>Laboratory Report</Text>   
      </View>
      
      <View style={styles.patientHeader} fixed>
        <View style={styles.column}>
          <Text style={styles.patientInfo}>Patient Name: </Text>
          <Text style={styles.patientInfo}>Age/Gender: </Text>
          <Text style={styles.patientInfo}>Requesting Physician: </Text>
        </View>
        
        <View style={styles.column1}>
          <Text style={styles.patientInfo}>Date:</Text>
          <Text style={styles.patientInfo}>Patient Type/Room No.: </Text>
          <Text style={styles.patientInfo}>Laboratory Number: </Text>
        </View>
      </View>
      
      
      <View style={styles.resultHeader} fixed>
          <Text style={styles.testName}>Test Name</Text>
          <Text style={styles.resultText}>Result</Text>
          <Text style={styles.unitText}>Unit</Text>
         <Text style={styles.referenceText}>Reference</Text>
      </View>
      
  
         
         
            <View>
              <Text style={styles.sectiontext}>CHEMISTRY</Text>
          </View>

          <View style={styles.resultBody}>
              <Text style={styles.testName}>Fasting Blood Sugar</Text>
              <Text style={styles.resultText}>NO INTESTINAL PARASITES SEEN</Text>
              <Text style={styles.unitText}>mg/dL</Text>
              <Text style={styles.referenceText}>NEGATIVE</Text>
          </View>

          <View>
              <Text style={styles.sectiontext}>Lipid Profile</Text>
          </View>
         
     
      
      
      
      
      <View style={styles.footer} fixed>
        <View style={styles.column}>
          <Text style={styles.footerText}>Name</Text>
          <Text style={styles.footerText}>REGISTERED MEDICAL TECHNOLOGIST</Text>
          <Text style={styles.footerText}>License No.: _____</Text>
        </View>
        
        <View style={styles.column}>
          <Text style={styles.footerText}>Modesty A. Leaño, MD, FSPS</Text>
          <Text style={styles.footerText}>ANATOMIC AND CLINICAL PATHOLOGIST</Text>
          <Text style={styles.footerText}>License No: 98717</Text>
        </View>
      </View>
      
    </Page>
  </Document>
)
};

export default FullResults;
