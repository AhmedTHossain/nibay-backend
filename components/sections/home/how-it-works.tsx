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
    <div className="p-6 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 transition duration-500 rounded-2xl mt-6 text-center">
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
        <p className="text-slate-400 mt-3">{text}</p>
        <div className="mt-5">
          <Link
            className="btn btn-link text-emerald-600 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
            href="/index-three"
          >
            Read More{" "}
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
    title: "Select Account Type (Individual/Company)",
    text: "Pick 'Individual' if signing up alone or 'Company' if for a business.",
    Icon: CircleUser
  },
  {
    id: 2,
    title: "Complete Your Profile",
    text: "Enter all required information to complete your profile setup.",
    Icon: UserPen
  },
  {
    id: 3,
    title: "Post a Job Advertisement",
    text: "List job information, skills, and criteria to find ideal candidates.",
    Icon: Megaphone
  },
  {
    id: 4,
    title: "View Applicants",
    text: "See all candidates who applied for the job with profiles and resumes.",
    Icon: FileUser
  },
  {
    id: 5,
    title: "Hire Employee",
    text: "Choose and confirm the candidate to hire for the listed role.",
    Icon: UserPlus
  }
];
