// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { 
  IonContent, IonButton, IonIcon, IonItem, IonLabel, IonInput, 
  IonCheckbox, IonGrid, IonRow, IonCol, IonNote, IonSpinner,
  IonAlert, IonLoading
} from '@ionic/react';
import { 
  personOutline, mailOutline, lockClosedOutline, 
  eyeOffOutline, eyeOutline, logoGoogle, logoFacebook,
  checkmarkCircleOutline, arrowBack, storefrontOutline
} from 'ionicons/icons';

import { useIonRouter } from '@ionic/react';
// hooks/usePageTitle.ts
import { useIonViewWillEnter } from '@ionic/react';


export const usePageTitle = (title: string) => {
  useIonViewWillEnter(() => {
    document.title = title;
  });
};

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

const SignUp: React.FC = () => {
  const ionRouter = useIonRouter();
  usePageTitle("Variedades Doña Luz - Registrarse");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (passwordStrength < 3) {
      newErrors.password = 'La contraseña es demasiado débil';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    if (field === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
    return colors[passwordStrength - 1] || '#6b7280';
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessAlert(true);
    }, 2000);
  };

  const handleSocialSignUp = (provider: string) => {
    alert(`Registro con ${provider} - Redirigiendo...`);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      newsletter: true
    });
    setErrors({});
    setPasswordStrength(0);

    // Redirigir al home después de resetear
    ionRouter.push('/home', 'forward', 'replace');
  };


  return (
    <IonContent className="force-light-theme">
      {/* Forzar light theme con CSS global */}
      <style>{`
        .force-light-theme {
          --ion-background-color: white !important;
          --ion-text-color: #1f2937 !important;
        }
        .force-light-theme ion-item {
          --background: white !important;
          --color: #1f2937 !important;
        }
        .force-light-theme ion-input {
          --background: white !important;
          --color: #1f2937 !important;
          --placeholder-color: #9ca3af !important;
        }
        .force-light-theme ion-checkbox {
          --background: white !important;
          --border-color: #d1d5db !important;
        }
      `}</style>

      <div className="min-h-screen relative">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        {/* Botón Volver */}
        <div className="absolute top-6 left-6 z-20">
          <IonButton 
            routerLink="/home"
            fill="clear"
            className="text-white bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-all duration-300"
          >
            <IonIcon icon={arrowBack} className="text-lg" />
          </IonButton>
        </div>

        {/* Contenido Principal */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Card del Formulario */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:shadow-3xl transition-all duration-500">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <IonIcon icon={storefrontOutline} className="text-4xl text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Únete a Nosotros
                </h1>
                <p className="text-gray-600 text-lg">
                  Descubre los mejores productos con <span className="font-semibold text-emerald-600">envío gratis</span>
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSignUp} className="space-y-6">
                {/* Nombres */}
                <IonGrid className="ion-no-padding">
                  <IonRow>
                    <IonCol>
                      <div className="space-y-2">
                        <IonItem 
                          className="ion-no-padding rounded-2xl border-2 border-gray-200 focus-within:border-emerald-400 transition-all duration-200 custom-input-item"
                          lines="none"
                        >
                          <IonInput
                            type="text"
                            placeholder="Nombre"
                            value={formData.firstName}
                            onIonInput={(e) => handleInputChange('firstName', e.detail.value!)}
                            className="custom-input bg-white text-gray-800 text-lg font-medium placeholder-gray-400"
                          />
                        </IonItem>
                        {errors.firstName && (
                          <IonNote color="danger" className="text-sm font-medium pl-4">
                            {errors.firstName}
                          </IonNote>
                        )}
                      </div>
                    </IonCol>
                    <IonCol>
                      <div className="space-y-2">
                        <IonItem 
                          className="ion-no-padding rounded-2xl border-2 border-gray-200 focus-within:border-emerald-400 transition-all duration-200 custom-input-item"
                          lines="none"
                        >
                          <IonInput
                            type="text"
                            placeholder="Apellido"
                            value={formData.lastName}
                            onIonInput={(e) => handleInputChange('lastName', e.detail.value!)}
                            className="custom-input bg-white text-gray-800 text-lg font-medium placeholder-gray-400"
                          />
                        </IonItem>
                        {errors.lastName && (
                          <IonNote color="danger" className="text-sm font-medium pl-4">
                            {errors.lastName}
                          </IonNote>
                        )}
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                {/* Email */}
                <div className="space-y-2">
                  <IonItem 
                    className="ion-no-padding rounded-2xl border-2 border-gray-200 focus-within:border-emerald-400 transition-all duration-200 custom-input-item"
                    lines="none"
                  >
                    <IonIcon icon={mailOutline} slot="start" className="text-gray-400 ml-3 text-xl" />
                    <IonInput
                      type="email"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                      className="custom-input bg-white text-gray-800 text-lg font-medium placeholder-gray-400"
                    />
                  </IonItem>
                  {errors.email && (
                    <IonNote color="danger" className="text-sm font-medium pl-4">
                      {errors.email}
                    </IonNote>
                  )}
                </div>

                {/* Contraseña */}
                <div className="space-y-3">
                  <IonItem 
                    className="ion-no-padding rounded-2xl border-2 border-gray-200 focus-within:border-emerald-400 transition-all duration-200 custom-input-item"
                    lines="none"
                  >
                    <IonIcon icon={lockClosedOutline} slot="start" className="text-gray-400 ml-3 text-xl" />
                    <IonInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      value={formData.password}
                      onIonInput={(e) => handleInputChange('password', e.detail.value!)}
                      className="custom-input bg-white text-gray-800 text-lg font-medium placeholder-gray-400"
                    />
                    <IonButton
                      fill="clear"
                      slot="end"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-emerald-500 transition-colors mr-2"
                    >
                      <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                    </IonButton>
                  </IonItem>
                  
                  {/* Indicador de fuerza de contraseña */}
                  {formData.password && (
                    <div className="px-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-600">Seguridad:</span>
                        <div 
                          className="text-xs font-bold px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: getPasswordStrengthColor() }}
                        >
                          {['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'][passwordStrength - 1] || ''}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(passwordStrength / 5) * 100}%`,
                            backgroundColor: getPasswordStrengthColor()
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <IonNote color="danger" className="text-sm font-medium pl-4">
                      {errors.password}
                    </IonNote>
                  )}
                </div>

                {/* Confirmar Contraseña */}
                <div className="space-y-2">
                  <IonItem 
                    className="ion-no-padding rounded-2xl border-2 border-gray-200 focus-within:border-emerald-400 transition-all duration-200 custom-input-item"
                    lines="none"
                  >
                    <IonIcon icon={lockClosedOutline} slot="start" className="text-gray-400 ml-3 text-xl" />
                    <IonInput
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmar contraseña"
                      value={formData.confirmPassword}
                      onIonInput={(e) => handleInputChange('confirmPassword', e.detail.value!)}
                      className="custom-input bg-white text-gray-800 text-lg font-medium placeholder-gray-400"
                    />
                    <IonButton
                      fill="clear"
                      slot="end"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-emerald-500 transition-colors mr-2"
                    >
                      <IonIcon icon={showConfirmPassword ? eyeOffOutline : eyeOutline} />
                    </IonButton>
                  </IonItem>
                  {errors.confirmPassword && (
                    <IonNote color="danger" className="text-sm font-medium pl-4">
                      {errors.confirmPassword}
                    </IonNote>
                  )}
                </div>

                {/* Términos y Condiciones */}
                <div className="bg-emerald-50/80 rounded-2xl p-4 space-y-4 border border-emerald-100">
                  <div className="space-y-2">
                    <IonItem className="ion-no-padding bg-transparent" lines="none">
                      <IonCheckbox
                        slot="start"
                        checked={formData.acceptTerms}
                        onIonChange={(e) => handleInputChange('acceptTerms', e.detail.checked)}
                        className="mr-3"
                        style={{ 
                          '--background': 'white',
                          '--border-color': '#d1d5db',
                          '--checkmark-color': 'white'
                        } as any}
                      />
                      <IonLabel className="text-gray-700 text-sm leading-relaxed">
                        Acepto los <a href="/terms" className="text-emerald-600 font-semibold hover:underline">Términos</a> y la <a href="/privacy" className="text-emerald-600 font-semibold hover:underline">Política de Privacidad</a> *
                      </IonLabel>
                    </IonItem>
                    {errors.acceptTerms && (
                      <IonNote color="danger" className="text-sm font-medium pl-12">
                        {errors.acceptTerms}
                      </IonNote>
                    )}
                  </div>

                  <IonItem className="ion-no-padding bg-transparent" lines="none">
                    <IonCheckbox
                      slot="start"
                      checked={formData.newsletter}
                      onIonChange={(e) => handleInputChange('newsletter', e.detail.checked)}
                      className="mr-3"
                      style={{ 
                        '--background': 'white',
                        '--border-color': '#d1d5db',
                        '--checkmark-color': 'white'
                      } as any}
                    />
                    <IonLabel className="text-gray-700 text-sm leading-relaxed">
                      Recibir ofertas exclusivas y <span className="font-semibold text-emerald-600">10% de descuento</span>
                    </IonLabel>
                  </IonItem>
                </div>

                {/* Botón de Registro */}
                <IonButton
                  type="submit"
                  expand="block"
                  className="bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading || !formData.acceptTerms}
                >
                  {isLoading ? (
                    <>
                      <IonSpinner className="mr-2" name="crescent" />
                      Creando Cuenta...
                    </>
                  ) : (
                    <>
                      <IonIcon icon={checkmarkCircleOutline} className="mr-2" />
                      Crear Cuenta
                    </>
                  )}
                </IonButton>
              </form>

              {/* Separador */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300/60"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">o continúa con</span>
                <div className="flex-1 border-t border-gray-300/60"></div>
              </div>

              {/* Botones de Redes Sociales */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <IonButton
                  fill="outline"
                  className="border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 rounded-xl"
                  onClick={() => handleSocialSignUp('Google')}
                >
                  <IonIcon icon={logoGoogle} className="mr-2 text-lg" />
                  Google
                </IonButton>
                <IonButton
                  fill="outline"
                  className="border-2 border-blue-500 text-blue-600 font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-xl"
                  onClick={() => handleSocialSignUp('Facebook')}
                >
                  <IonIcon icon={logoFacebook} className="mr-2 text-lg" />
                  Facebook
                </IonButton>
              </div>

              {/* Enlace a Login */}
              <div className="text-center">
                <p className="text-gray-600 mb-3">
                  ¿Ya tienes una cuenta?
                </p>
                <IonButton
                  routerLink="/login"
                  fill="clear"
                  className="text-emerald-600 font-bold text-lg hover:text-emerald-700 transition-colors"
                >
                  Iniciar Sesión
                </IonButton>
              </div>
            </div>

            {/* Footer Simple */}
            <div className="text-center mt-6">
              <p className="text-white/80 text-sm">
                © 2024 Variedades Doña Luz. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas */}
      <IonAlert
        isOpen={showSuccessAlert}
        onDidDismiss={() => setShowSuccessAlert(false)}
        header="¡Bienvenido a la Familia!"
        message="Tu cuenta ha sido creada exitosamente. Revisa tu email para confirmar tu cuenta y obtener tu 10% de descuento."
        buttons={[
          {
            text: 'Empezar a Comprar',
            handler: resetForm            
          }
        ]}
      />

      <IonLoading
        isOpen={isLoading}
        message={'Creando tu cuenta...\nPreparando tus beneficios exclusivos'}
        duration={0}
      />
    </IonContent>
  );
};

export default SignUp;