import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';



// Create styles
const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    flexWrap: 'wrap',
    border: "1px solid black"
  },
  header:{
    flex: 1,
    width: 550,
    height: 550,
    alignItems: 'center',
    border: '1px solid black',
  },
  headerText:{
      fontFamily: 'Verdana, sans-serif',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  titleContacts: {
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 8,
  },
  patientHeader:{
    flex: 1,
    width: 550,
    height: 1,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    border: '1px solid red'
  },
  compHeader:{
        flex: 1,
        width: 550,
        height: 100,
        flexShrink: 1,
  },
  ptDetails:{
      fontSize: 9,
  },
  resultBody:{
    flex: 1,
    width: 550,
    height: 250,
    alignItems: 'flex-start',
  },
  resultHeader:{
    flex: 1,
    width: 550,
    height: 20,
  },
  footer:{
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    flex: 1,
    width: 550,
    height: 20,
  },
  resultBody:{
    flex: 1,
    width: 550,
    height: 230,
  }
});

// Create Document Component
const ResultForm = () => (
<PDFViewer width="800px" height="500px" showToolbar={false}>
  <Document>
    <Page size="A5" orientation= "landscape" style={styles.page}>

        <View fixed={true} style={styles.header}>
            <View style={styles.compHeader}>
                <Text style={styles.title}>St. Camillus De Lellis General Hospital</Text>
                <Text style={[styles.title]}>Laboratory Department</Text>
                <Text style={styles.titleContacts}>Contact No.: 600-1125</Text>
                <Text style={styles.titleContacts}>e-mail: st.camillusdelellislab@yahoo.com</Text>  
                <Text style={[styles.title]}>Laboratory Report</Text>   
               
            </View>
            {/* Patient Header */}
            <View style={styles.patientHeader}> 
                <Text style={[styles.ptDetails]}>Patient Name:</Text>
                <Text style={styles.ptDetails}>Age/Gender:</Text>
                <Text style={styles.ptDetails}>Address / Room:</Text>
                <Text style={styles.ptDetails}>Physician:</Text>
            </View>
        
        </View>


        <View style={styles.resultBody}>
            <View style={styles.resultHeader}>
                <Text style={[styles.title]}>Section</Text> 
            </View>
            <View style={styles.resultBody}>
            </View>


        </View>


        <View fixed={true} style={styles.footer}>
            <Text style={styles.ptDetails}>RMT:</Text>
            <Text style={styles.ptDetails}>Pathologist:</Text>
        </View>
    </Page>
  </Document>
</PDFViewer>
);

//  <View style={{
//   }}>


//     <View style={{
//       flex: 1,
//       width: 550,
//       height: 250,
//     }}>
//       <View style={{
//         flex: 1,
//         width: 550,
//         height: 20,
//       }} />
//       <View style={{
//         flex: 1,
//         width: 550,
//         height: 230,
//       }} />
//     </View>


//     <View style={{
//       flex: 1,
//       width: 550,
//       height: 30,
//     }} />
//   </View>

export default ResultForm;