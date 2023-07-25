import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import Moment from 'moment'
import arialbd from '../../fonts/arialbd.ttf'
import arial from '../../fonts/arial.ttf'
import logo from '../../images/stcamlogo.jpg'
import lablogo from '../../images/lablogo.jpg'
Font.register({ family: 'arialbd', src: arialbd, fontStyle: 'normal', fontWeight: 'bold' });
Font.register({ family: 'arial', src: arial, fontStyle: 'normal', fontWeight: 'normal' });

// Create styles
const styles = StyleSheet.create({
  body: {
    
  },
      header:{
      margin: 10
    },
  companyHeader:{
    margin: 25,
  },
  compHeaderText:{
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: '20px'
  },
  bold:{
   fontFamily: 'Helvetica-Bold' 
  },
  compContacts:{
    fontSize: '12px',
    textAlign: 'center'
  },
  marginTop:{
    marginTop: 10
  },
  date:{
      textAlign: 'right',
    marginBottom: 20
  },
  patientDetails:{
    fontSize: '20px'
  },
  chargeSlipHeader:{
    borderTop: '2px dotted black',
    borderBottom: '2px dotted black',
    marginTop: -15,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  chargeSlipTHead:{
    fontSize: 25
  },
  chargeSlip:{
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  col:{
    width: 200
  },
  chargeBody:{
    borderBottom: '2px dotted black',
    margin: 25
  },
  discount:{
    fontSize: 15
  },
  footer:{
    margin: 25
  },
  logo:{
    width: 90,
    position: 'absolute'
  },
  lablogo:{
    width: 90,
    position: 'absolute',
    right: 0
  }
});

// Create Document Component
const ChargeSlip = (props) => {
  return(
<Document>
    <Page size="Letter" style={styles.body}>
      <View style={styles.header}>
        <View style={styles.companyHeader}>
          <Image style={styles.logo} src={logo} />
          <Image style={styles.lablogo} src={lablogo} />
          <Text style={[styles.compHeaderText, styles.bold]}>St. Camillus De Lellis General Hospital</Text>
          <Text style={[styles.compHeaderText, styles.bold]}>Laboratory Department</Text>
          <Text style={styles.compContacts}>Gomburza cor. Z. Flores Sts. Brgy. 6 San Agustin, Laoag City</Text>
          <Text style={styles.compContacts}>Cellphone No.: 0961 366 8271 | Telephone No.: 600-1125 </Text>
          <Text style={styles.compContacts}>e-mail: st.camillusdelellislab@yahoo.com</Text>
          <Text style={[styles.compHeaderText, styles.bold, styles.marginTop]}>CHARGE SLIP</Text>
          <Text style={styles.date}>Date: {Moment(props.data.createdAt).format('MMMM DD, yyyy')}</Text>
          <Text style={styles.patientDetails}>Patient Name: {props.data.Patientlists[0].lastname}, {props.data.Patientlists[0].firstname} {props.data.Patientlists[0].middlename}</Text>
          <Text style={styles.patientDetails}>Age/Gender: {props.data.Patientlists[0].age} / {props.data.Patientlists[0].gender}</Text>
          <Text style={styles.patientDetails}>Patient Type/Room No: {props.data.ptType}</Text>
          <Text style={styles.patientDetails}>Laboratory Number: {props.data.labNumber}</Text>
          <Text style={styles.patientDetails}>Requesting Physician: {props.data.reqDr}</Text>
        </View>
        <View style={styles.chargeSlipHeader}>
            <Text style={[styles.chargeSlipTHead,styles.bold, styles.col]}>PARTICULARS</Text>
              <Text style={[styles.chargeSlipTHead,styles.bold]}>COST</Text>
        </View>
        
          <View style={styles.chargeBody}>

          {props.data.chemCost !== "0" &&
            <View style={styles.chargeSlip}>
                <Text style={[styles.patientDetails, styles.col]}>Chemistry</Text>
                <Text style={styles.patientDetails}>PHP {props.data.chemCost}{props.data.isDiscounted === true && `**`}</Text>
            </View>
          }

          {props.data.seroCost !== "0" &&
            <View style={styles.chargeSlip}>
                <Text style={[styles.patientDetails, styles.col]}>Serology</Text>
                <Text style={styles.patientDetails}>PHP {props.data.seroCost}{props.data.isDiscounted === true && `**`}</Text>
            </View>
          }
          
          {props.data.hemaCost !== "0" &&
            <View style={styles.chargeSlip}>
                <Text style={[styles.patientDetails, styles.col]}>Hematology</Text>
                <Text style={styles.patientDetails}>PHP {props.data.hemaCost}{props.data.isDiscounted === true && `**`}</Text>
            </View>
          }
          {props.data.cmCost !== "0" &&
            <View style={styles.chargeSlip}>
                <Text style={[styles.patientDetails, styles.col]}>Clinical Microscopy</Text>
                <Text style={styles.patientDetails}>PHP {props.data.cmCost}{props.data.isDiscounted === true && `**`}</Text>
            </View>
          }

        </View>
        
         <View style={styles.chargeSlip}>
                <Text style={[styles.chargeSlipTHead, styles.col, styles.bold]}>TOTAL COST</Text>
                <Text style={[styles.chargeSlipTHead, styles.bold]}>PHP {props.data.totalCost}{props.data.isDiscounted === true && `**`}</Text>
          </View>
          {props.data.isDiscounted === true &&
        <View style={styles.chargeSlip}>
                <Text style={[styles.discount, styles.col, styles.bold]}>**discount applied</Text>
                <Text style={[styles.chargeSlipTHead, styles.bold]}></Text>
          </View>}
        
        
         <View style={styles.footer}>
              <View>
                    <Text style={[styles.patientDetails, styles.col, styles.bold]}>Prepared By:</Text>
                    <Text style={[styles.chargeSlipTHead, styles.bold]}></Text>
              </View>
              <View>
                    <Text style={[styles.patientDetails, styles.bold]}>{props.data.encodedBy}</Text>
                    <Text style={[styles.chargeSlipTHead, styles.bold]}></Text>
              </View>
        </View>
        
      </View>
    </Page>
  </Document>
)
};

export default ChargeSlip;
