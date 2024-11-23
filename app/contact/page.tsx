import contact_bg from "@/app/assets/contact-bg.svg";
import Image from "next/image";
import Header from "../components/header";
import Footer from "@/components/sections/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContactItemsProps {
  title: string;
  description: string;
  value: string;
  id: number;
  link: string;
  // eslint-disable-next-line
  Icon: any;
}

const contactItems: ContactItemsProps[] = [
  {
    id: 1,
    title: "ফোন",
    description: "এর ফ্রেসাল সিকোয়েন্স এখন তাই অনেকের প্রচার ও সুবিধা",
    value: "+152 534-468-854",
    link: "tel:+152 534-468-854",
    Icon: () => {
      return (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 16 16"
          className=" text-[30px] text-emerald-600 group-hover:text-white"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
        </svg>
      );
    }
  },
  {
    id: 2,
    title: "ইমেইল",
    description: "এর ফ্রেসাল সিকোয়েন্স এখন তাই অনেকের প্রচার ও সুবিধা",
    value: "contact@example.com",
    link: "mailto:contact@example.com",
    Icon: () => {
      return (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={20} height={16} x={2} y={4} rx={2} />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    }
  },
  {
    id: 3,
    title: "লোকেশন",
    description: "এর ফ্রেসাল সিকোয়েন্স এখন তাই অনেকের প্রচার ও সুবিধা",
    value: "View on Google map",
    link: "#",
    Icon: () => {
      return (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 256 256"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
        </svg>
      );
    }
  }
];

function ContactBox(props: ContactItemsProps) {
  const { Icon, description, title, value, link } = props;
  return (
    <div className="text-center px-6">
      <div className="relative text-transparent">
        <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
          <Icon />
        </div>
      </div>
      <div className="content mt-7">
        <h5 className="title h5 text-lg font-semibold">{title}</h5>
        <p className="text-slate-400 mt-3">{description}</p>
        <div className="mt-5">
          <a
            className="btn btn-link text-emerald-600 hover:text-emerald-600 after:bg-emerald-600 transition duration-500"
            href={link}
          >
            {value}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContactRoute() {
  return (
    <>
      <Header />
      <section className="relative lg:py-36 py-20">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
            <div className="lg:col-span-7 md:col-span-6">
              <Image src={contact_bg} alt="Contact bg image" />
            </div>
            <div className="lg:col-span-5 md:col-span-6">
              <div className="lg:ms-5">
                <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                  <h3 className="mb-6 text-2xl leading-normal font-semibold">
                    যোগাযোগ করুন !
                  </h3>
                  <form>
                    <div className="grid lg:grid-cols-12 lg:gap-6">
                      <div className="lg:col-span-6 mb-5">
                        <label htmlFor="name" className="font-semibold">
                          আপনার নাম:
                        </label>
                        <Input
                          name="name"
                          id="name"
                          type="text"
                          className="mt-2"
                          placeholder="নাম:"
                        />
                      </div>
                      <div className="lg:col-span-6 mb-5">
                        <label htmlFor="email" className="font-semibold">
                          আপনার ইমেইল:
                        </label>
                        <Input
                          name="email"
                          id="email"
                          type="email"
                          className="mt-2"
                          placeholder="ইমেইল :"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <div className="mb-5">
                        <label htmlFor="subject" className="font-semibold">
                          প্রশ্ন
                        </label>
                        <Input
                          name="subject"
                          id="subject"
                          className="mt-2"
                          placeholder="প্রশ্ন :"
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="comments" className="font-semibold">
                          কমেন্ট
                        </label>
                        <Textarea
                          name="comments"
                          id="comments"
                          className="mt-2"
                          placeholder="কমেন্ট :"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      id="submit"
                      name="send"
                      className="btn bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                    >
                      সেন্ড মেসেজ
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container lg:mt-24 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
            {contactItems.map((item) => {
              return <ContactBox key={item.id} {...item} />;
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
