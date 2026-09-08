import { FormEvent, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  FileUp,
  Loader2,
  Mail,
  MapPin,
  Paperclip,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

const questions = [
  {
    id: "participants",
    label: "02 / How many students are on your team?",
    placeholder: "Enter a number",
    type: "number",
    min: 1,
  },
  {
    id: "coordinator",
    label: "03 / Faculty coordinator name",
    placeholder: "Full name",
    type: "text",
  },
  {
    id: "email",
    label: "04 / Coordinator email address",
    placeholder: "name@school.edu",
    type: "email",
  },
] as const;

const categoryOptions = [
  "Event one",
  "fdsfs",
  "event2",
  "adsases",
  "event3",
  "dfsdsfsdgs",
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chooseFile = (selectedFile?: File) => {
    if (!selectedFile) return;
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("That file is larger than 10MB. Please choose a smaller file.");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.querySelector('input[name="categories"]:checked')) {
      toast.error("Please select at least one category.");
      return;
    }

    if (!file) {
      toast.error("Please attach your school profile or team brief.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Submission failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 850));
      }
      setSubmitted(true);
      form.reset();
      setFile(null);
      toast.success("Registration packet received.");
    } catch {
      toast.error("Something went wrong. Please try again or contact the fest team.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink selection:bg-lime selection:text-ink">
      <header className="relative z-20 mx-auto flex max-w-[1380px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a href="#top" className="group flex items-center gap-3" aria-label="Commerce Fest home">
          <span className="grid size-10 rotate-[-6deg] place-items-center rounded-full bg-ink text-sm font-black text-lime transition-transform duration-200 group-hover:rotate-0">CF</span>
          <span className="hidden font-display text-lg font-extrabold tracking-[-0.04em] sm:inline">COMMERCE<br />FEST.</span>
        </a>
        <nav className="flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink/65 sm:gap-8">
          <a className="transition-colors hover:text-ink" href="#about">About</a>
          <a className="hidden transition-colors hover:text-ink sm:inline" href="mailto:hello@commercefest.school">Contact</a>
        </nav>
        <a href="#register" className="hidden rounded-full border border-ink/25 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-all hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper sm:inline-flex">Register your school <ArrowUpRight className="ml-2 size-3.5" /></a>
      </header>

      <section id="top" className="relative mx-auto max-w-[1380px] px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-12 lg:pt-20">
        <div className="pointer-events-none absolute -right-36 top-0 hidden size-[29rem] rounded-full border border-ink/10 lg:block" />
        <div className="pointer-events-none absolute -right-16 top-24 hidden size-[17rem] rounded-full bg-lime/80 lg:block" />
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow reveal" style={{ animationDelay: "60ms" }}><Sparkles className="size-3.5" /> filler text</p>
            <h1 className="reveal mt-7 font-display text-[clamp(4.5rem,11.5vw,10.5rem)] font-black leading-[0.79] tracking-[-0.085em]" style={{ animationDelay: "120ms" }}>
              Fancytext234
            </h1>
            <p className="reveal mt-9 max-w-md text-base leading-7 text-ink/65 sm:text-lg" style={{ animationDelay: "180ms" }}>
              A description blabababalal
            </p>
            <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
              <a href="#register" className="inline-flex items-center rounded-full bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#b8ef3d] active:scale-[0.97]">Start registration <ArrowDownRight className="ml-3 size-4" /></a>
              <span className="text-xs font-semibold text-ink/50">Open to all senior schools</span>
            </div>
          </div>

          <div className="relative z-10 lg:pb-5">
            <div className="grain-card relative min-h-[310px] overflow-hidden rounded-[2rem] bg-ink p-7 text-paper shadow-[12px_14px_0_0_#d9d4c8] sm:min-h-[355px] sm:p-10">
              <div className="absolute -right-14 -top-14 size-44 rounded-full border-[22px] border-lime/90" />
              <div className="absolute bottom-[-4.5rem] right-10 size-44 rotate-12 border-[22px] border-paper/10" />
              <div className="relative flex h-full min-h-[250px] flex-col justify-between">
                <div className="flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-[0.18em] text-paper/55">
                  <span>Issue no. 01</span><span></span>
                </div>
                <div>
                  <p className="max-w-xs font-display text-4xl font-bold leading-[0.92] tracking-[-0.06em] sm:text-5xl">WELCOME TO COMMERCE FEST</p>
                  <div className="mt-7 flex items-end justify-between gap-4">
                    <div className="space-y-1 text-xs text-paper/55"><p className="font-semibold text-paper/85">Hosted by D.A.V Boys Senior Secondary School, Gopalapuram</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-ink/15 pt-4 text-[0.67rem] font-bold uppercase tracking-[0.15em] text-ink/50">
              <span>Patrick</span><span>Limited entries</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-ink/15 bg-lime">
        <div className="mx-auto grid max-w-[1380px] gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-12">
          <p className="font-display text-3xl font-black leading-none tracking-[-0.06em] sm:text-4xl">PLACEHOLDER</p>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            <div className="border-t border-ink/25 pt-3"><p className="font-display text-xl font-black tracking-[-0.06em]">Download the rulebook here:</p><p className="mt-2 text-sm leading-5 text-ink/70">placeholder for link to rulebook</p></div>
            <div className="border-t border-ink/25 pt-3"><p className="font-display text-xl font-black tracking-[-0.06em]">Meet our organisers</p><p className="mt-2 text-sm leading-5 text-ink/70">Link to list of organisers</p></div>
            <div className="border-t border-ink/25 pt-3"><p className="font-display text-xl font-black tracking-[-0.06em]">About D.A.V</p></div>
          </div>
        </div>
      </section>

      <section id="register" className="mx-auto max-w-[1380px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="eyebrow"><span className="size-2 rounded-full bg-lime-ink" /> Entry form</p><h2 className="mt-5 max-w-2xl font-display text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl">Register here</h2></div>
          <p className="max-w-xs text-sm leading-6 text-ink/55">Tell us a little about your school and your team. All fields are required.</p>
        </div>

        {submitted ? (
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-paper sm:p-14">
            <div className="absolute -right-10 -top-10 size-48 rounded-full border-[25px] border-lime" />
            <div className="relative max-w-2xl"><div className="grid size-14 place-items-center rounded-full bg-lime text-ink"><Check className="size-7" /></div><p className="eyebrow mt-8 text-lime"><Sparkles className="size-3.5" /> Registration received</p><h3 className="mt-5 font-display text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl">You’re<br /><span className="text-lime">on the list.</span></h3><p className="mt-7 max-w-lg text-base leading-7 text-paper/65">Thanks for registering your school for Commerce Fest. Keep an eye on your coordinator’s inbox for the next steps and event brief.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-8 inline-flex items-center rounded-full border border-paper/25 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-lime hover:text-lime">Submit another entry <ArrowUpRight className="ml-2 size-4" /></button></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="space-y-9">
              <Field label="School name" name="schoolName" placeholder="Name of school" required />
              <fieldset className="space-y-3">
                <legend className="form-label">01 / Which categories are you entering?</legend>
                <p className="text-sm leading-6 text-ink/50">Select all that apply.</p>
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  {categoryOptions.map((option) => (
                    <label key={option} className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-ink/15 bg-white/35 px-4 py-3 transition-colors hover:border-ink/45 hover:bg-lime/20">
                      <input type="checkbox" name="categories" value={option} className="peer sr-only" />
                      <span className="grid size-5 shrink-0 place-items-center rounded-md border border-ink/30 bg-paper text-transparent transition-all peer-checked:border-ink peer-checked:bg-lime peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime-ink"><Check className="size-3.5" strokeWidth={3} /></span>
                      <span className="text-sm font-semibold leading-5 text-ink/75 transition-colors group-hover:text-ink">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {questions.map((question) => <Field key={question.id} name={question.id} label={question.label} placeholder={question.placeholder} type={question.type} min={"min" in question ? question.min : undefined} required />)}
              <div className="space-y-3"><label className="form-label" htmlFor="previous">05 / filler question</label><input id="previous" name="previousExperience" type="text" required placeholder="PLACEHOLDER" className="form-input" /></div>
              <div className="space-y-3"><label className="form-label" htmlFor="story">06 / FILLER QUESTION</label><textarea id="story" name="teamStory" required rows={4} placeholder="PLACEHOLDER" className="form-input min-h-32 resize-y" /></div>
            </div>

            <div className="space-y-8 lg:pt-1">
              <div className="rounded-[1.5rem] border border-ink/15 bg-white/45 p-5 sm:p-7">
                <div className="mb-5 flex items-start justify-between gap-3"><div><p className="form-label">file upload placeholder</p><p className="mt-1 text-sm text-ink/55">text67</p></div><Paperclip className="size-5 text-ink/45" /></div>
                <label htmlFor="attachment" onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); chooseFile(event.dataTransfer.files[0]); }} className={`flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 text-center transition-all ${isDragging ? "border-ink bg-lime/45" : "border-ink/25 bg-paper/55 hover:border-ink/60 hover:bg-lime/20"}`}>
                  <input ref={fileInputRef} id="attachment" name="attachment" type="file" required accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} />
                  {file ? <><div className="grid size-12 place-items-center rounded-full bg-ink text-lime"><FileUp className="size-5" /></div><p className="mt-4 max-w-full truncate text-sm font-bold">{file.name}</p><p className="mt-1 text-xs text-ink/50">{(file.size / 1024 / 1024).toFixed(2)} MB · Click to replace</p></> : <><div className="grid size-12 place-items-center rounded-full bg-lime text-ink"><UploadCloud className="size-5" /></div><p className="mt-4 text-sm font-bold">Drop your file here</p><p className="mt-1 text-xs text-ink/50">or click to browse · max 10MB</p></>}
                </label>
                <div className="mt-4 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink/45"><span className="size-1.5 rounded-full bg-lime-ink" /> PDF, DOCX, JPG, PNG accepted</div>
              </div>

              <div className="border-t border-ink/15 pt-5"><div className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-ink/45" /><p className="text-sm leading-6 text-ink/55">Commerce Fest 2026<br /><span className="text-ink/40">D.A.V Boys Senior Secondary School, Gopalapuram, Chennai</span></p></div><div className="mt-4 flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-ink/45" /><p className="text-sm leading-6 text-ink/55">Questions?<br /><a className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink" href="mailto:fart@gmail.com">fart@gmail.com</a></p></div></div>
              <button type="submit" disabled={isSubmitting} className="group inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#b8ef3d] disabled:cursor-wait disabled:opacity-70 active:scale-[0.98]">{isSubmitting ? <><Loader2 className="mr-3 size-4 animate-spin" /> Sending your entry...</> : <>Complete registration <ArrowUpRight className="ml-3 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></>}</button>
              <p className="text-center text-[0.68rem] leading-5 text-ink/45">By submitting, you confirm that the details above are accurate and that your school can participate in Commerce Fest 2026.</p>
            </div>
          </form>
        )}
      </section>

      <footer className="border-t border-ink/15 bg-ink text-paper">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><p className="font-display text-xl font-black tracking-[-0.05em]">COMMERCE <span className="text-lime">FEST.</span></p><p className="text-xs text-paper/45">2026 COMMERCE FEST</p><a className="inline-flex items-center text-xs font-bold uppercase tracking-[0.12em] text-lime" href="#top">Back to top <ArrowUpRight className="ml-2 size-3.5" /></a></div>
      </footer>
    </main>
  );
}

function Field({ label, name, placeholder, type, min }: { label: string; name: string; placeholder: string; type?: string; min?: number; required?: boolean }) {
  return <div className="space-y-3"><label className="form-label" htmlFor={name}>{label}</label><input id={name} name={name} type={type ?? "text"} min={min} required placeholder={placeholder} className="form-input" /></div>;
}
