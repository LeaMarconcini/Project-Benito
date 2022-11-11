#include <WiFi.h>
#include "FirebaseESP32.h"
#include <LiquidCrystal_I2C.h> 

int lcdColumns = 16;
int lcdRows = 2;
// int cantcaracteres = 0;
// int longitud_texto = frase.length();  //Obtiene y almacena la longitud del texto

LiquidCrystal_I2C lcd (0x27, lcdColumns, lcdRows);

//Credenciales wifi
#define WIFI_SSID "Testarduino"
#define WIFI_PASSWORD "fachitas"

//Credenciales Proyecto Firebase
#define FIREBASE_HOST "detectormentiras-4c916-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "AIzaSyDfWRbfdnseWb_-S8ULOn1LIA9-IX8B1tw"

//Firebase Data object 
FirebaseData firebaseData;
String nodo = "/test";
bool iterar = true;


void setup() {

  lcd.begin();
  lcd.backlight();

  Serial.begin (115200);
  Serial.println();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print ("Conectado al WI-FI");
  while (WiFi.status() != WL_CONNECTED);
  {
    Serial.print ("");
    delay (300);

  }
  Serial.println();

  Firebase.begin (FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // lcd.setCursor(0, 0);   //Posiciona el cursor en la posicion (0,0)
  // lcd.print(frase);    //Muestra el mensaje
  // delay(1500);
}

void loop() {

  Firebase.getString(firebaseData, nodo + "/testpregunta");
  Serial.println(firebaseData.stringData());
  String a = firebaseData.stringData();
  int longitud_texto = a.length();
  
  lcd.setCursor(0, 0);   //Posiciona el cursor en la posicion (0,0)
  lcd.print(a);    //Muestra el mensaje
  // delay(1500);
  //Mueve el texto a la izquierda tantas veces como su longitud
  for (int posicion = 0; posicion < longitud_texto; posicion++)
  {
    lcd.scrollDisplayLeft();
    delay(300);
  }

  //Mueve el texto a la derecha tantas veces como su longitud, mas 16, que es el tamaño de la pantalla
  for (int posicion = 0; posicion < (16 + longitud_texto); posicion++)
  {
    lcd.scrollDisplayRight();
    delay(300);
  }

  //Mueve el texto a la izquierda hasta quedar el su posicion inicial
  for (int posicion = 0; posicion < 16; posicion++)
  {
    lcd.scrollDisplayLeft();
    delay(300);
  }

  delay(1000);
  lcd.clear();
}
