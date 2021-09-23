import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';





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
    padding: '10px'
  },
  pcol:{
    width: 350,
  },
  pcol1:{
    width: 200,
  },
  patientInfoText:{
    fontSize: '9px',
  },
  resultBody:{
    width: 575.28,
    padding: '10px',
  },
  resultHeader:{
    marginTop: '5px',
    fontSize: '10px',
    fontWeight: "bold",
    width: 575.28
  },
  footer:{
    width: 575.28,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 29
  },
  footerCol:{
    width: 200,
  },
  footerCol1:{
    width: 200,
    height: 30,
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
    fontSize: '10px',
    fontWeight: 'bold',
    width: 138.82,
    textAlign: 'center',
    borderBottom: '1px dotted black',
    borderTop: '1px dotted black',
    padding: 5
  },
  tableHeader:{
    width: 575.28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 555.28,
  },
   body:{
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
}
});

// Create Document Component
const ResultForm = () => (
<PDFViewer width="800px" height="500px" showToolbar={false}>
  <Document>
    <Page size="A5" orientation= "landscape" style={styles.page}>
      <View style={styles.wrap}>
        <View fixed={true} style={styles.header}>
          <View style={styles.companyHeader}>
            <Text style={styles.companyHText}>St. Camillus De Lellis General Hospital</Text>
            <Text style={styles.companyHText}>Laboratory Department</Text>
            <Text style={styles.contactText}>Telephone No.: 600-1125  |  e-mail: st.camillusdelellislab@yahoo.com</Text>
            <Text style={[styles.companyHText, styles.marginTop]}>Laboratory Report</Text>
          </View>
          <View style={styles.patientHeader}>
            <View style={styles.pcol}>
              <Text style={styles.patientInfoText}>Patient Name:</Text>
              <Text style={styles.patientInfoText}>Age/Gender:</Text>
              <Text style={styles.patientInfoText}>Requesting Physician:</Text>
            </View>

            <View style={styles.pcol1}>
              <Text style={styles.patientInfoText}>Date:</Text>
              <Text style={styles.patientInfoText}>Paitent Type/Room:</Text>
              <Text style={styles.patientInfoText}>Laboratory Number:</Text>
            </View>
          </View>
        </View>

        <View style={styles.resultBody}>
          <Text fixed={true} style={styles.resultHeader}>Section</Text>
          
          <View style={styles.resTable}>
            
            <View style={styles.tableHeader} fixed={true}>
                <Text style={styles.resHText}>Test Name</Text>
                <Text style={styles.resHText}>Result</Text>
                <Text style={styles.resHText}>Unit</Text>
                <Text style={styles.resHText}>Reference</Text>
            </View>


            
            
            
          </View>
          
        </View>
      
      
      

        </View>
        <Text fixed={true} style={styles.footerMessage}>** Results are electronically printed. Physical signature is not necessary. **</Text>
        <View fixed={true} style={styles.footer}>
          <View style={styles.footerCol}>
            {/* IMAGE HERE FOR RMT */}
            <Text style={styles.footerText}>REGISTERED MEDICAL TECHNOLOGIST</Text>
          </View>

          <View style={styles.footerCol1}>
            {/* IMAGE HERE FOR PATHO SIG */}
          <Text style={styles.footerText}>PATHOLOGIST</Text>
          </View>
        </View>
    </Page>
      
  </Document>
</PDFViewer>
);

export default ResultForm;
