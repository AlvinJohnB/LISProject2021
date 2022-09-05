const Quixote = () => (
    <Document>
      <Page size="Letter" style={styles.body}>
        <View fixed style={styles.header}>
          <View style={styles.companyHeader}>
            <Text style={[styles.compHeaderText, styles.bold]}>St. Camillus De Lellis General Hospital</Text>
            <Text style={[styles.compHeaderText, styles.bold]}>Laboratory Department</Text>
            <Text style={styles.compContacts}>Gomburza cor. Z. Flores Sts. Brgy. 6 San Agustin, Laoag City</Text>
            <Text style={styles.compContacts}>Cellphone No.: 0961 366 8271 | Telephone No.: 600-1125  |  e-mail: st.camillusdelellislab@yahoo.com</Text>
            <Text style={[styles.compHeaderText, styles.bold, styles.marginTop]}>Charge Slip</Text>
            <Text style={styles.date}>Date: 09-05-2022</Text>
            <Text style={styles.patientDetails}>Patient Name: Bregana, Alvin John E.</Text>
            <Text style={styles.patientDetails}>Age/Gender:</Text>
            <Text style={styles.patientDetails}>Patient Type/Room No:</Text>
            <Text style={styles.patientDetails}>Laboratory Number:</Text>
            <Text style={styles.patientDetails}>Requesting Physician:</Text>
          </View>
          <View style={styles.chargeSlipHeader}>
              <Text style={[styles.chargeSlipTHead,styles.bold, styles.col]}>PARTICULARS</Text>
                <Text style={[styles.chargeSlipTHead,styles.bold]}>COST</Text>
          </View>
            <View style={styles.chargeBody}>
              <View style={styles.chargeSlip}>
                  <Text style={[styles.patientDetails, styles.col]}>Chemistry</Text>
                  <Text style={styles.patientDetails}>PHP 150</Text>
              </View>
  
              <View style={styles.chargeSlip}>
                  <Text style={[styles.patientDetails, styles.col]}>Hematology</Text>
                  <Text style={styles.patientDetails}>PHP 150</Text>
              </View>
  
              <View style={styles.chargeSlip}>
                  <Text style={[styles.patientDetails, styles.col]}>Serology</Text>
                  <Text style={styles.patientDetails}>PHP 150</Text>
              </View>
  
              <View style={styles.chargeSlip}>
                  <Text style={[styles.patientDetails, styles.col]}>Clinical Microscopy</Text>
                  <Text style={styles.patientDetails}>PHP 150</Text>
              </View>
          </View>
          
           <View style={styles.chargeSlip}>
                  <Text style={[styles.chargeSlipTHead, styles.col, styles.bold]}>TOTAL COST</Text>
                  <Text style={[styles.chargeSlipTHead, styles.bold]}>PHP 600</Text>
            </View>
          <View style={styles.chargeSlip}>
                  <Text style={[styles.discount, styles.col, styles.bold]}>**discount applied</Text>
                  <Text style={[styles.chargeSlipTHead, styles.bold]}></Text>
            </View>
          
          
           <View style={styles.footer}>
                <View>
                      <Text style={[styles.patientDetails, styles.col, styles.bold]}>Prepared By:</Text>
                      <Text style={[styles.chargeSlipTHead, styles.bold]}></Text>
                </View>
                <View>
                      <Text style={[styles.patientDetails, styles.bold]}>Alvin John E. Begana, RMT</Text>
                      <Text style={[styles.chargeSlipTHead, styles.bold]}></Text>
                </View>
          </View>
          
        </View>
      </Page>
    </Document>
  );
  
  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });
  
  const styles = StyleSheet.create({
    body: {
      border: "1px solid red"
    },
        header:{
        border: "1px solid blue",
        margin: 10
      },
    companyHeader:{
      margin: 25,
      border: "1px solid green"
    },
    compHeaderText:{
      textAlign: 'center',
      fontFamily: 'Helvetica',
      fontSize: '25px'
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
    }
  });
  
  ReactPDF.render(<Quixote />);
  