import "./globals.css";
import Rubik from 'next/font/local'
import Mozilla_Text from 'next/font/local'

const rubik = Rubik({
  src: './fonts/rubik_font.ttf',
  variable: "--font-rubik",
});

const mozilla = Mozilla_Text({
  src: './fonts/mozillatext_font.ttf',
  variable: "--font-mozilla-text",
});

export const metadata = {
  title: "Script Bucket",
  description: "A bucket of script.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${rubik.variable} ${mozilla.variable}`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
