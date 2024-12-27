import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Minimum length is 4")
    .max(16, "Maximum length is 16")
    .required("Password length is required"),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isGenerated, setGenerated] = useState(false);
  const [upper, setUpper] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [lower, setLower] = useState(false);
  const [special, setSpecial] = useState(false);

  const generatePasswordString = (passwordLength) => {
    let characterList = '';

    if (upper) characterList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) characterList += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) characterList += '0123456789';
    if (special) characterList += '!@#$%^&*()_+';

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setGenerated(true);
  };

  const createPassword = (characterList, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * characterList.length);
      result += characterList.charAt(index);
    }
    return result;
  };

  const reset = () => {
    setPassword('');
    setUpper(false);
    setNumbers(false);
    setLower(false);
    setSpecial(false);
    setGenerated(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>🔐 Random Password Generator</Text>
      <Formik
        initialValues={{ passwordLength: '' }}
        validationSchema={PasswordSchema}
        onSubmit={(values) => generatePasswordString(Number(values.passwordLength))}
      >
        {({ values, errors, touched, handleChange, handleSubmit, handleReset }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={values.passwordLength}
              onChangeText={handleChange('passwordLength')}
              placeholder="Enter password length"
              placeholderTextColor="#CCCCCC"
              keyboardType="numeric"
            />
            {errors.passwordLength && touched.passwordLength && (
              <Text style={styles.errorText}>{errors.passwordLength}</Text>
            )}

            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#4CAF50"
                unfillColor="#FFFFFF"
                text="Include Uppercase"
                iconStyle={{ borderColor: "#4CAF50" }}
                textStyle={{ textDecorationLine: "none", color: '#FFF' }}
                style={styles.checkbox}
                isChecked={upper}
                onPress={() => setUpper(!upper)}
              />
              <BouncyCheckbox
                size={25}
                fillColor="#2196F3"
                unfillColor="#FFFFFF"
                text="Include Lowercase"
                iconStyle={{ borderColor: "#2196F3" }}
                textStyle={{ textDecorationLine: "none", color: '#FFF' }}
                style={styles.checkbox}
                isChecked={lower}
                onPress={() => setLower(!lower)}
              />
              <BouncyCheckbox
                size={25}
                fillColor="#FFC107"
                unfillColor="#FFFFFF"
                text="Include Numbers"
                iconStyle={{ borderColor: "#FFC107" }}
                textStyle={{ textDecorationLine: "none", color: '#FFF' }}
                style={styles.checkbox}
                isChecked={numbers}
                onPress={() => setNumbers(!numbers)}
              />
              <BouncyCheckbox
                size={25}
                fillColor="#E91E63"
                unfillColor="#FFFFFF"
                text="Include Special Characters"
                iconStyle={{ borderColor: "#E91E63" }}
                textStyle={{ textDecorationLine: "none", color: '#FFF' }}
                style={styles.checkbox}
                isChecked={special}
                onPress={() => setSpecial(!special)}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Generate Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => { handleReset(); reset(); }}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>

            {isGenerated && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Generated Password:</Text>
                <Text selectable={true} style={styles.password}>{password}</Text>
              </View>
            )}
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#BB86FC',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#1F1F1F',
    padding: 15,
    borderRadius: 8,
    color: '#FFF',
    marginBottom: 10,
  },
  errorText: {
    color: '#FF5252',
    marginBottom: 10,
  },
  checkboxContainer: {
    marginVertical: 20,
  },
  checkbox: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#03DAC6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  resetButton: {
    backgroundColor: '#CF6679',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    color: '#BB86FC',
    fontSize: 18,
    marginBottom: 10,
  },
  password: {
    color: '#03DAC6',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
