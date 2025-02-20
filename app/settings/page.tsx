import Footer from "@/components/sections/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../components/header";
import { AccountSettings } from "./components/AccountSettings";
import { PasswordSettings } from "./components/PasswordSettings";
import { useTranslations } from "next-intl";

export default function SettingsRoute() {
  const t = useTranslations("Settings");
  return (
    <>
      <Header />
      <section className="relative lg:py-36 py-20">
        <div className="container">
          <Tabs defaultValue="account">
            <TabsList className="bg-transparent border-b-2 w-full text-left justify-start">
              <TabsTrigger
                value="account"
                className="data-[state=active]:bg-transparent text-black data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-black  data-[state=active]:shadow-none rounded-none text-md"
              >
                {t("account_settings")}
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="data-[state=active]:bg-transparent text-black data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-black  data-[state=active]:shadow-none rounded-none text-md"
              >
                {t("password_settings")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <AccountSettings />
            </TabsContent>
            <TabsContent value="password">
              <PasswordSettings />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </>
  );
}
