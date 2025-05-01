import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./components/LandingPage";
import DashboardLayout from "./layouts/DashboardLayout";
import VoiceExchange from "./components/VoiceExchange";
import TextToSpeechTranslate from "./components/TextToSpeechTranslate";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NativeMode from "./components/NativeMode";
import { DocumentTranslator } from "./components/DocumentTranslate";
import { SpeechToText } from "./components/SpeechToText";

function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* Landing Page  */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          {/* Dashboard page */}
          <Route path="/chat" element={<DashboardLayout />}>
            <Route index element={<VoiceExchange />} />
            <Route path="text-to-speech" element={<TextToSpeechTranslate />} />
            <Route path="speech-to-text" element={<SpeechToText />} />
            <Route path="native-mode" element={<NativeMode />} />
            <Route path="document-translate" element={<DocumentTranslator />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
