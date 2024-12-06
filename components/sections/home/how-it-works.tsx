import {
  CircleUser,
  FileUser,
  LucideIcon,
  Megaphone,
  UserPen,
  UserPlus
} from "lucide-react";
import Link from "next/link";

type HowItWorksProps = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

export function HowItWorks(props: HowItWorksProps) {
  const { text, title, Icon } = props;

  return (
    <div className="p-6 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 transition duration-500 rounded-2xl text-center">
      <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
        <Icon />
      </div>
      <div className="content mt-7">
        <a
          className="title h5 text-lg font-semibold hover:text-emerald-600"
          href="/index-three"
        >
          {title}
        </a>
        <p className="text-slate-800 mt-3">{text}</p>
        <div className="mt-5">
          <Link
            className="btn btn-link text-emerald-600 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
            href="/index-three"
          >
            আর পড়ুন{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              className="ms-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const howItWorksItems = [
  {
    id: 1,
    title: "অ্যাকাউন্টের ধরন (ব্যক্তিগত/প্রতিষ্ঠান)",
    text: "ব্যক্তিগতভাবে সাইন আপ করলে 'ব্যক্তিগত' এবং ব্যবসার জন্য নিবন্ধন করলে 'প্রতিষ্ঠান' নির্বাচন করুন।",
    Icon: CircleUser
  },
  {
    id: 2,
    title: "আপনার প্রোফাইল সম্পূর্ণ করুন",
    text: "আপনার অ্যাকাউন্ট সেট আপ সম্পন্ন করতে এবং সম্পূর্ণ অ্যাক্সেস আনলক করতে প্রয়োজনীয় সমস্ত তথ্য পূরণ করুন।",
    Icon: UserPen
  },
  {
    id: 3,
    title: "চাকরির বিজ্ঞাপন পোস্ট করুন",
    text: "উপযুক্ত প্রার্থীদের আকৃষ্ট করতে চাকরির বিবরণ, প্রয়োজনীয়তা এবং যোগ্যতা প্রদান করুন।",
    Icon: Megaphone
  },
  {
    id: 4,
    title: "প্রার্থীদের দেখুন",
    text: "যারা চাকরির জন্য আবেদন করেছে তাদের তালিকা পর্যালোচনা করুন, পাশাপাশি তাদের প্রোফাইল এবং জমা দেওয়া জীবনবৃত্তান্ত দেখুন।",
    Icon: FileUser
  },
  {
    id: 5,
    title: "কর্মচারী নিয়োগ করুন",
    text: "যাকে পদের জন্য নিয়োগ করতে চান তাকে নির্বাচন করুন এবং নিশ্চিত করুন।",
    Icon: UserPlus
  }
];
