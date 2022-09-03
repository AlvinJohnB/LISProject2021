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
  page: {
    paddingTop: 15,
    paddingBottom: 100,
    paddingHorizontal: 35,
    alignItems: 'center',
  },
header:{
    width: 575.28,
    marginTop: 50
  },
  wrap:{
    width: 575.28,
  },
companyHeader:{
    width: 575.28,
    marginBottom: 20
  },
  companyHText:{
    fontSize: '18px',
    textAlign: 'center'
  },
  contactText:{
    textAlign: 'center',
    fontSize: '10px'
  },
  marginTop:{
    marginTop: 2,
  },
  patientHeader:{
    flex: 1,
    flexDirection: 'row',
    width: 575.28,
    paddingLeft: '10px',
    justifyContent: 'center',
    height: 100
  },
  pcol:{
    width: 300,
  },
  pcol1:{
    width: 200,
  },
  patientInfoText:{
    fontSize: '14px',
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
    bottom: 250,
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
    fontSize: '19px',
    width: 130,
    textAlign: 'center',
    borderBottom: '1px dotted black',
    borderTop: '1px dotted black',
    padding: 5
  },
  testNameHeader:{
    fontFamily: 'arialbd',
    fontSize: '18px',
    width: 300,
    textAlign: 'center',
    borderBottom: '1px dotted black',
    borderTop: '1px dotted black',
    padding: 5
  },
  tableHeader:{
    width: 560.28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
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
  fontSize: '15px',
  fontWeight: 'bold',
  width: 300,
  padding: 2,
  textAlign: 'center'
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
  width: "60px",
  position: 'absolute',
  left: "40px",
  bottom: "40px"
},
lablogo:{
  width: "60px",
  position: 'absolute',
  right: "40px",
  bottom: "40px"
},
signature:{
  fontFamily: 'arial',
  fontSize: '13px',
},
total:{
  marginTop: 90,
  fontFamily: 'Helvetica-Bold'
},
preparedBy:{
  position: 'relative',
  right: '80px',
  bottom: '10px'
},
discount:{
  fontSize: 11,
  position: 'relative',
  left: 120
}
});

// Create Document Component
const ChargeSlip = (props) => {
  return(
  <Document>
    <Page size="A4" orientation= "portrait" style={styles.page}>
      <View style={styles.wrap}>
        <View fixed={true} style={styles.header}>
          <View style={styles.companyHeader}>
            <Image src={logo} style={styles.logo} fixed={true}/>
            <Image src={lablogo} style={styles.lablogo} fixed={true}/>
            <Text style={styles.companyHText}>St. Camillus De Lellis General Hospital</Text>
            <Text style={styles.companyHText}>Laboratory Department</Text>
            <Text style={styles.contactText}>Cellphone No.: 0961 366 8271 | Telephone No.: 600-1125  |  e-mail: st.camillusdelellislab@yahoo.com</Text>
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
          
          <View style={styles.resTable}>
            
            <View style={styles.tableHeader} fixed={true}>
                <Text style={styles.testNameHeader}>PARTICULARS</Text>
                <Text style={styles.testNameHeader}>COST</Text>
            </View>
            
            {props.data.chemCost !== "0" &&
                <View style={styles.resTr}>
                <Text style={styles.testName}>Chemistry</Text>
                <Text></Text>
                <Text style={styles.testName}>PHP {props.data.chemCost}{props.data.isDiscounted === true && `**`}</Text>
                <Text></Text>
                </View>
            }
            {props.data.seroCost !== "0" &&
                <View style={styles.resTr}>
                <Text style={styles.testName}>Serology</Text>
                <Text></Text>
                <Text style={styles.testName}>PHP {props.data.seroCost}{props.data.isDiscounted === true && `**`}</Text>
                <Text></Text>
                </View>            
            }
            {props.data.hemaCost !== "0" &&
                <View style={styles.resTr}>
                <Text style={styles.testName}>Hematology</Text>
                <Text></Text>
                <Text style={styles.testName}>PHP {props.data.hemaCost}{props.data.isDiscounted === true && `**`}</Text>
                <Text></Text>
                </View>
            }
                
            {props.data.cmCost !== "0" &&
                <View style={styles.resTr}>
                <Text style={styles.testName}>Clinical Microscopy</Text>
             
                <Text style={styles.testName}>PHP {props.data.cmCost}{props.data.isDiscounted === true && `**`}</Text>
      
                </View>
            }
                
            
          </View>
          
        </View>
        <View style={[styles.resTr, styles.total]}>
          <Text style={styles.testName}>TOTAL COST</Text>
          <Text style={styles.testName}>PHP {props.data.totalCost}{props.data.isDiscounted === true && `**`}</Text>
         </View>
         {props.data.isDiscounted === true && <Text style={styles.discount}>**Discount applied</Text>}
      
        </View>
         <View fixed={true} style={styles.footer}>
          <View style={styles.footerCol}>
            <Text  style={[styles.preparedBy, styles.signature]}>Prepared by:</Text>
            <Text style={styles.signature} fixed={true}>{props.data.encodedBy}</Text>
          </View>

          <View style={styles.footerCol1} wrap={false}>
          
          </View>
        </View>
    </Page>
      
  </Document>
)
};

export default ChargeSlip;
