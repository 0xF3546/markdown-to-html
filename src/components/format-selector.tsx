import {
  Radio,
  radioClasses,
  RadioGroup,
  Sheet,
  FormLabel,
  Avatar,
} from "@mui/joy";
import { useMarkdownStore } from "../hooks/useMarkdownStore";
import { OutputFormat } from "../types/OutputFormat";
import { FaHtml5, FaReact, FaVuejs } from "react-icons/fa";
import { SiNextdotjs, SiAngular } from "react-icons/si";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { JSX } from "react";

const formats: { value: OutputFormat; label: string; icon: JSX.Element }[] = [
  { value: "html", label: "HTML", icon: <FaHtml5 size={24} /> },
  { value: "react", label: "React", icon: <FaReact size={24} /> },
  { value: "nextjs", label: "Next.js", icon: <SiNextdotjs size={24} /> },
  { value: "angular", label: "Angular", icon: <SiAngular size={24} /> },
  { value: "vue", label: "Vue.js", icon: <FaVuejs size={24} /> },
];

export function FormatSelector() {
  const { outputFormat, setOutputFormat } = useMarkdownStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as OutputFormat;
    setOutputFormat(value);
  };

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-semibold">Output Format</h2>
      <RadioGroup
        aria-label="Output Format"
        name="output-format"
        value={outputFormat}
        onChange={handleChange}
        overlay
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", // 💡 dynamisch & responsiv
          gap: 2,
          width: "100%",
          [`& .${radioClasses.checked}`]: {
            [`& .${radioClasses.action}`]: {
              inset: -1,
              border: "3px solid",
              borderColor: "primary.500",
            },
          },
          [`& .${radioClasses.radio}`]: {
            display: "contents",
            "& > svg": {
              zIndex: 2,
              position: "absolute",
              top: "-8px",
              right: "-8px",
              bgcolor: "background.surface",
              borderRadius: "50%",
            },
          },
        }}
      >
        {formats.map(({ value, label, icon }) => (
          <Sheet
            key={value}
            variant="outlined"
            sx={{
              borderRadius: "md",
              boxShadow: "sm",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              p: 2,
              position: "relative",
              width: "100%",
            }}
          >
            <Radio value={value} checkedIcon={<CheckCircleRoundedIcon />} />
            <Avatar variant="soft" size="sm">
              {icon}
            </Avatar>
            <FormLabel htmlFor={value}>{label}</FormLabel>
          </Sheet>
        ))}
      </RadioGroup>
    </div>
  );
}
