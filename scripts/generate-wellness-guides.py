#!/usr/bin/env python3
"""Generate deeper SK Creation wellness education PDFs."""

from pathlib import Path

from fpdf import FPDF
import fitz

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DATA = PUBLIC / "data"

TEAL = (13, 148, 136)
TEAL_DARK = (15, 118, 110)
INK = (24, 24, 27)
MUTED = (82, 82, 91)
LINE = (204, 251, 241)
RULE = (226, 232, 240)
PAPER = (240, 253, 250)
WHITE = (255, 255, 255)
DISCLAIMER = (
    "Education and awareness only — not therapy, diagnosis, or emergency care. "
    "If you are in crisis, contact local emergency services. In the U.S., call or text 988."
)
SOURCE = "Source: Pilot My Career  ·  https://www.pilotmycareer.com/"


def ascii(text: str) -> str:
    return (
        text.replace("—", " - ")
        .replace("–", "-")
        .replace("’", "'")
        .replace("‘", "'")
        .replace("“", '"')
        .replace("”", '"')
        .replace("…", "...")
    )


class WellnessPDF(FPDF):
    def __init__(self, kicker: str, title: str):
        super().__init__(format="Letter", unit="mm")
        self.kicker = kicker
        self.doc_title = title
        self.set_auto_page_break(auto=True, margin=24)
        self.set_margins(18, 22, 18)

    def header(self):
        self.set_fill_color(*TEAL)
        self.rect(0, 0, 216, 14, "F")
        self.set_xy(18, 4)
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(*WHITE)
        self.cell(0, 6, ascii("SK CREATION  ·  WELLNESS EDUCATION"), align="L")
        self.set_y(20)

    def footer(self):
        self.set_y(-20)
        self.set_draw_color(*TEAL)
        self.set_line_width(0.3)
        self.line(18, self.get_y(), 198, self.get_y())
        self.ln(2)
        self.set_font("Helvetica", "", 6.5)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 3.2, ascii(DISCLAIMER))
        self.set_y(-8)
        self.set_font("Helvetica", "", 6.5)
        self.cell(90, 4, ascii(SOURCE), align="L")
        self.cell(0, 4, f"{self.doc_title}  ·  {self.page_no()}", align="R")

    def h1(self, title: str, subtitle: str):
        self.set_font("Helvetica", "B", 20)
        self.set_text_color(*INK)
        self.multi_cell(0, 8, ascii(title))
        self.ln(1)
        self.set_font("Helvetica", "I", 11)
        self.set_text_color(*TEAL_DARK)
        self.multi_cell(0, 6, ascii(subtitle))
        self.ln(3)

    def h2(self, text: str):
        if self.get_y() > 236:
            self.add_page()
        self.ln(1.5)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(*TEAL_DARK)
        self.multi_cell(0, 6, ascii(text))
        self.ln(1)

    def body(self, text: str):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*INK)
        self.multi_cell(0, 5.2, ascii(text))
        self.ln(1.5)

    def bullets(self, items: list[str]):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*INK)
        for item in items:
            x = self.l_margin
            y = self.get_y()
            if y > 248:
                self.add_page()
                y = self.get_y()
            self.set_fill_color(*TEAL)
            self.ellipse(x + 0.6, y + 1.6, 1.8, 1.8, "F")
            self.set_xy(x + 6, y)
            self.multi_cell(self.epw - 6, 5.2, ascii(item))
            self.ln(0.6)
        self.ln(1)

    def callout(self, label: str, text: str):
        if self.get_y() > 222:
            self.add_page()
        start = self.get_y()
        width = self.epw
        self.set_xy(self.l_margin + 4, start + 3)
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(*TEAL_DARK)
        self.multi_cell(width - 8, 4, ascii(label.upper()))
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*INK)
        self.set_x(self.l_margin + 4)
        self.multi_cell(width - 8, 5, ascii(text))
        end = self.get_y() + 3
        self.set_fill_color(*PAPER)
        self.rect(self.l_margin, start, 1.6, end - start, "F")
        self.set_y(end + 2)

    def table(self, headers: list[str], rows: list[list[str]], col_w: list[float]):
        line_h = 4.2
        pad = 1.8
        usable = sum(col_w)
        if abs(usable - self.epw) > 0.6:
            col_w = [w * self.epw / usable for w in col_w]

        def measure(cells: list[str], style: str) -> float:
            self.set_font("Helvetica", style, 8.5)
            tallest = 0.0
            for i, cell in enumerate(cells):
                content = ascii(cell) or " "
                lines = self.multi_cell(
                    col_w[i] - 2 * pad,
                    line_h,
                    content,
                    dry_run=True,
                    output="LINES",
                    align="L",
                )
                tallest = max(tallest, max(1, len(lines)) * line_h)
            min_h = 9.5 if any(not c.strip() for c in cells) else 0
            return max(tallest + 2 * pad, min_h)

        def draw_row(cells: list[str], style: str, fill, text_color, border=True):
            rh = measure(cells, style)
            if self.get_y() + rh > 252:
                self.add_page()
            x0 = self.l_margin
            y0 = self.get_y()
            self.set_fill_color(*fill)
            self.set_draw_color(*RULE)
            self.set_line_width(0.2)
            self.rect(x0, y0, sum(col_w), rh, "FD" if border else "F")
            self.set_font("Helvetica", style, 8.5)
            self.set_text_color(*text_color)
            for i, cell in enumerate(cells):
                self.set_xy(x0 + sum(col_w[:i]) + pad, y0 + pad)
                self.multi_cell(col_w[i] - 2 * pad, line_h, ascii(cell), align="L")
            self.set_xy(x0, y0 + rh)

        if self.get_y() > 210:
            self.add_page()
        draw_row(headers, "B", TEAL, WHITE, border=False)
        fill = False
        for row in rows:
            draw_row(row, "", PAPER if fill else WHITE, INK)
            fill = not fill
        self.set_y(self.get_y() + 3)


def build_breathing() -> WellnessPDF:
    pdf = WellnessPDF("Wellness Education", "5-Minute Breathing Reset")
    pdf.add_page()
    pdf.h1(
        "5-Minute Breathing Reset",
        "A practical reset for interview spikes, application stress, and racing thoughts",
    )
    pdf.body(
        "Job-search pressure is often a short spike, not a character flaw. A message lands. "
        "An interview starts in ten minutes. Your mind jumps ahead to every possible no. "
        "This guide is a five-minute education sequence you can use in those moments so "
        "your next action is chosen, not frantic."
    )
    pdf.callout(
        "What this is — and what it is not",
        "This is wellness education for everyday stress spikes during a search. It is not "
        "treatment for anxiety disorders, panic attacks, trauma, asthma, or other medical "
        "conditions. It will not make a hard market easy. If breathing work makes you dizzy, "
        "tense, lightheaded, or worse, stop and return to a normal breath. If you have a "
        "respiratory or cardiac condition, use only what a clinician has already cleared.",
    )

    pdf.h2("Why a slower exhale can help")
    pdf.body(
        "A stress spike is a body-and-attention event. Heart rate often rises, the breath "
        "gets shallow and high in the chest, and attention narrows onto threat: the "
        "rejection, the blank screen, the email you have not answered. You do not need a "
        "perfectly calm feeling. You need enough steadiness to choose one next step."
    )
    pdf.body(
        "Longer, slower exhales are widely used in wellness and first-aid-style stress "
        "education because they give the nervous system a clearer 'safe enough to continue' "
        "signal than arguing with the thought. Naming three things you can see does a "
        "similar job: it returns attention to the room you are actually in. Neither move "
        "erases the problem. Both can interrupt the loop long enough to act."
    )
    pdf.bullets(
        [
            "Shallow chest breathing often keeps the spike going, even when the threat is only a thought.",
            "Naming what you can see interrupts rumination more reliably than debating the thought.",
            "One small next action beats a perfect plan you will not start.",
            "Five minutes is long enough to change state and short enough to use between tasks.",
        ]
    )

    pdf.h2("When to use it — and when to pause")
    pdf.body(
        "Use this as a bridge, not as a test of character. Skip it when your body needs "
        "medical attention or when the practice itself increases distress."
    )
    pdf.table(
        ["A reasonable time to use this", "Pause and get other support if"],
        [
            [
                "Before an interview, screen, or live coding round",
                "You feel faint, cannot catch your breath, have chest pain, or unusual shortness of breath",
            ],
            [
                "After a rejection, ghosting, or a sharp email",
                "Panic, despair, or hopelessness lasts most days for two weeks and blocks daily tasks",
            ],
            [
                "When you are staring at an application and cannot start",
                "You have thoughts of harming yourself. Contact emergency help now. In the U.S., call or text 988.",
            ],
            [
                "Between back-to-back search tasks, before you open the next tab",
                "Breathing practice increases distress, dizziness, or a sense of unreality rather than settling it",
            ],
        ],
        [90, 90],
    )

    pdf.h2("The five-minute sequence")
    pdf.body(
        "Sit if you can. Keep both feet on the floor. Silence notifications for five minutes. "
        "If you are in a waiting room, keep your eyes open and make the breath quieter, not "
        "dramatic. Set a timer so you are not watching the clock."
    )
    pdf.table(
        ["Time", "Move", "What good-enough looks like"],
        [
            [
                "0:00-0:30 Ground",
                "Feet down. Drop shoulders. Unclench jaw. Name 3 objects you can see, out loud if privacy allows.",
                "You know where you are. The thought is still there, but it is not the whole room.",
            ],
            [
                "0:30-2:30 Breath",
                "Inhale through the nose for 4. Hold 2. Exhale through the mouth for 6. Repeat about 10 rounds.",
                "The exhale is longer than the inhale. If 4-2-6 feels strained, switch to 3-1-5. Never force air.",
            ],
            [
                "2:30-3:30 Body",
                "Five slow shoulder rolls. Press fingertips together for 5 seconds, then release. Soften your gaze.",
                "Hands and jaw are less tight. You can feel the chair or floor again.",
            ],
            [
                "3:30-4:30 Choose",
                'Name the spike: "This is search stress." Pick one next action only. Write it in one line.',
                "One verb + one object: open the doc, send the reply, stand up and walk.",
            ],
            [
                "4:30-5:00 Start",
                "Set a 2-minute timer. Do the first 20% of that action. Do not grade the quality.",
                "Motion has started. Perfection is postponed on purpose.",
            ],
        ],
        [36, 72, 72],
    )

    pdf.h2("Coaching notes so the sequence stays reliable")
    pdf.bullets(
        [
            "Count on the exhale, not the inhale. If you lose the count, start the next round without restarting the five minutes.",
            "Keep the breath quiet enough that a person nearby would not notice. Large gasps can increase dizziness.",
            "If your mind races during the hold, shorten or drop the hold. The longer exhale is the useful part.",
            "The 'choose' step is not optional. A reset with no next action often becomes another stall.",
            "Stop immediately if you feel tingling, tunnel vision, or panic climbing. Return to a normal breath and name five sounds in the room.",
        ]
    )

    pdf.h2("If the 4-2-6 breath feels awkward")
    pdf.body(
        "The reliable part is not the brand of the technique. It is a slower exhale, a named "
        "environment, and a single next step. Pick the version you will actually use."
    )
    pdf.table(
        ["If this is happening", "Use this version", "Avoid"],
        [
            [
                "Interview or on-camera wait",
                "Eyes open. Smaller breaths. Phone on airplane mode in your pocket. One silent exhale cycle, then name your first sentence.",
                "Closing your eyes in a waiting room or taking huge audible breaths",
            ],
            [
                "A stressful email just arrived",
                "Close the message. Do ground + breath. Write a draft only. Schedule send for later if you can.",
                "Replying in the same five minutes you are still spiked",
            ],
            [
                "Night rumination about the search",
                "Skip the 'start a task' step. Use ground + slower exhale + a lights-out routine. Paper and pen if thoughts return.",
                "Opening the job board in bed 'just to check'",
            ],
            [
                "4-2-6 feels forced or dizzy",
                "Two short inhales through the nose, one long mouth exhale, 3-5 times. Or a slow walk, counting 20 footsteps.",
                "Pushing through dizziness to 'finish the exercise'",
            ],
        ],
        [42, 78, 60],
    )

    pdf.h2("Common mistakes that make this less reliable")
    pdf.table(
        ["Mistake", "What to do instead"],
        [
            [
                "Using the five minutes to rewrite your whole resume or reread the rejection",
                "The five minutes are for state change. The work happens after the timer, on one named action.",
            ],
            [
                "Stacking caffeine, doom-scrolling, and this sequence in the same window",
                "Put the phone face down. Water is fine. Save the extra coffee until after the first action is started.",
            ],
            [
                "Judging the reset if you still feel nervous",
                "Nervous plus able to start is a success. Calm is optional. Usable is the goal.",
            ],
            [
                "Doing it once in a crisis and never practicing",
                "Skill beats intensity. Practice on an ordinary day so the sequence is familiar on a spike day.",
            ],
        ],
        [80, 100],
    )

    pdf.h2("A one-week practice, not a one-time trick")
    pdf.body(
        "Use the reset once a day for seven days even when you do not feel panicked. After "
        "lunch is a good default because it sits between morning applications and afternoon "
        "follow-ups. Then use it on spike days too. Track only three fields. If you cannot "
        "name a next action, the reset is incomplete."
    )
    pdf.table(
        ["Day", "Trigger (or 'practice')", "Next action taken"],
        [
            ["1", "", ""],
            ["2", "", ""],
            ["3", "", ""],
            ["4", "", ""],
            ["5", "", ""],
            ["6", "", ""],
            ["7", "", ""],
        ],
        [28, 76, 76],
    )
    pdf.body(
        "At the end of the week, keep the version you actually used. Retire the version that "
        "only looked impressive. If the same trigger appears five times, the next action may "
        "need to change (for example: walk first, then draft), not the breathing count."
    )
    pdf.callout(
        "Reliability note",
        "Breathing will not replace sleep, food, movement, or human support. Use it as a "
        "bridge back to a sustainable search pace. If stress, panic, or low mood keep "
        "interfering with daily life, talk with a licensed clinician or your employee "
        "assistance program. Pair this page with Job Search Burnout Signals if the spike "
        "is becoming an all-week load problem.",
    )
    return pdf


def build_burnout() -> WellnessPDF:
    pdf = WellnessPDF("Wellness Education", "Job Search Burnout Signals")
    pdf.add_page()
    pdf.h1(
        "Job Search Burnout Signals",
        "How to notice drain early and run a one-week recovery reset without quitting the search",
    )
    pdf.body(
        "A job search is unpaid, high-uncertainty work. You produce effort for delayed, often "
        "silent feedback. That mix — low control, repeated evaluation, and identity on the "
        "line — is why capable people burn hot and then stall. This guide helps you spot the "
        "stall early and change the load before motivation collapses."
    )
    pdf.callout(
        "Not a diagnosis",
        "Burnout is discussed here as an educational pattern: exhaustion, cynicism, and a "
        "reduced sense of progress in a search. It is not a medical diagnosis. It is not the "
        "same as depression, anxiety disorders, ADHD, or grief. Those require licensed care. "
        "This PDF will not tell you which one you have, and a high self-check score is not a "
        "clinical result.",
    )

    pdf.h2("Why job-search drain is different from a hard workweek")
    pdf.body(
        "In a job, effort usually maps to a meeting, a ticket, or a visible result. In a "
        "search, a full day can produce nothing you can point to. Ghosting removes closure. "
        "Comparison on LinkedIn adds a second job: managing other people's highlight reels. "
        "If you treat the search like a sprint with no recovery, quality falls and then volume "
        "falls too."
    )
    pdf.bullets(
        [
            "Unpredictable reward: many applications, few replies. The brain stays on alert.",
            "Identity load: 'I am not working' can feel like 'I am not valuable' unless you separate them.",
            "Hidden labor: research, forms, follow-ups, and emotional recovery after each no.",
            "Social isolation: fewer colleagues, more time alone with the inbox.",
            "Unclear finish line: you cannot 'complete' the market. You can only complete today's chosen actions.",
        ]
    )

    pdf.h2("Three different problems that get called burnout")
    pdf.body(
        "Using the same word for everything makes the next step fuzzy. Read this as a sorting "
        "aid, not as a test."
    )
    pdf.table(
        ["Pattern", "It often looks like", "A more reliable next step"],
        [
            [
                "A hard week",
                "Two or three rough days, sleep mostly intact, you can still finish one application",
                "Protect one evening off-screen. Keep volume. Recheck next week.",
            ],
            [
                "Search-load burnout pattern",
                "10-14 days of exhaustion + cynicism + 'nothing I finish counts', even after rest attempts",
                "Run the recovery week in this guide. Cut load, not identity.",
            ],
            [
                "Possible clinical concern",
                "Most days for two weeks: cannot get out of bed, no pleasure in anything, panic, or thoughts of self-harm",
                "This PDF is not enough. Contact a clinician, EAP, emergency services, or 988 in the U.S.",
            ],
        ],
        [42, 68, 70],
    )

    pdf.h2("Signal map — four places drain shows up")
    pdf.body(
        "Look for a pattern over 10-14 days, not one bad afternoon. One delayed application is "
        "a schedule issue. Two weeks of avoidance plus sleep loss plus 'nothing I do matters' "
        "is a load problem."
    )
    pdf.table(
        ["Area", "Early signal", "If ignored, it often becomes"],
        [
            [
                "Behavior",
                "You postpone applications you used to finish the same day. Tabs stay open. Follow-ups slip.",
                "You stop applying except in bursts, then crash for days.",
            ],
            [
                "Thinking",
                "Rejections replay for hours. You read silence as proof you are behind.",
                "Global stories: 'I am unhireable' instead of 'this role was not a match'.",
            ],
            [
                "Body & sleep",
                "Harder to fall asleep after search blocks. Restless mornings. Tension in jaw or shoulders.",
                "You feel exhausted before you open the laptop, so you delay until evening and sleep worse.",
            ],
            [
                "Relationships",
                "You hide the search, skip messages, or only talk about the hunt.",
                "Support shrinks right when you need a low-pressure human contact.",
            ],
        ],
        [32, 74, 74],
    )

    pdf.h2("Weekly self-check (five minutes, Sunday or Friday)")
    pdf.body(
        "Rate the past 7 days from 1 (low / rare) to 5 (high / most days). This is a personal "
        "dashboard, not a clinical score. Write the number. Do not justify it."
    )
    pdf.table(
        ["Item", "1 looks like", "5 looks like", "Your 1-5"],
        [
            [
                "Exhaustion after search blocks",
                "Tired, then recover with a walk or meal",
                "Wiped out; even a short task feels heavy",
                "",
            ],
            [
                "Cynicism / irritability",
                "Frustrated at process, still able to draft",
                "Everything feels pointless or insulting",
                "",
            ],
            [
                "Focus consistency",
                "Some drift, you return to the task",
                "You cannot stay with one application for 20 minutes",
                "",
            ],
            [
                "Sense of progress",
                "Unclear week, but you can name 2 completed actions",
                "Busy all day, nothing finished you would stand behind",
                "",
            ],
            [
                "Recovery quality",
                "Evenings mostly work for sleep and one off-screen block",
                "Search thoughts follow you into bed and weekends",
                "",
            ],
        ],
        [46, 50, 56, 28],
    )
    pdf.body(
        "Read it as a trend, not a verdict. Copy last week's numbers next to this week's. "
        "Direction matters more than a single high score."
    )
    pdf.table(
        ["If this is the pattern", "Do this next"],
        [
            [
                "Most items at 1-2, maybe one 3",
                "Keep your current pace. Protect the recovery you already have. Recheck in 7 days.",
            ],
            [
                "Mixed 2-4, or one item stuck at 4-5",
                "Change one load factor only: volume, hours, or networking format. Recheck next week.",
            ],
            [
                "Two or more items at 4-5 for two weeks in a row",
                "Run the recovery week below. Do not add a new job-search system on top.",
            ],
            [
                "Scores stay high and daily life (sleep, hygiene, food, leaving the house) is breaking",
                "Add licensed support. The recovery week is not a substitute for care.",
            ],
        ],
        [82, 98],
    )
    pdf.callout(
        "Get additional support if",
        "Low mood, panic, or sleep collapse lasts most days and blocks basic functioning; "
        "you cannot get out of bed; or you have thoughts of self-harm. Those are not "
        "'push through' signals. Contact local emergency services, 988 in the U.S., a "
        "clinician, or an employee assistance program.",
    )

    pdf.h2("What you can change vs. what you cannot")
    pdf.body(
        "Burnout gets worse when people try to control the market. Recovery starts with the "
        "levers you actually hold."
    )
    pdf.table(
        ["Usually outside your control", "Inside your control this week"],
        [
            [
                "Reply rates, ghosting, hiring freezes, other people's timelines",
                "How many applications you start, and a cap you will honor",
            ],
            [
                "Whether a role is already filled",
                "Search hours on the calendar, and a daily close time",
            ],
            [
                "Someone else's highlight reel on LinkedIn",
                "When you open social feeds, and whether you open them before deep work",
            ],
            [
                "How long an interview process takes",
                "Sleep window, caffeine cutoff, and one human contact that is not networking",
            ],
        ],
        [90, 90],
    )

    pdf.h2("One-week recovery reset")
    pdf.body(
        "The goal is not to stop the search. The goal is to cut intensity so quality and "
        "sleep can return. Treat this week as a constrained experiment, not as quitting."
    )
    pdf.bullets(
        [
            "Volume: reduce applications by about 25-40% from last week. Cap at one high-quality application per day.",
            "Hours: pick a search window (for example 9:30-12:00). Outside it, the search is closed.",
            "Recovery: two no-screen blocks of 20-30 minutes (walk, cook, call a person — not 'research companies').",
            "Networking: move one ask to a lower-pressure format — a short message or voice note instead of a camera call.",
            "Close the day: write one completed action before you shut the laptop. Progress is evidence, not mood.",
            "Sleep: same wake time if you can. No applications in bed. Caffeine cutoff by early afternoon.",
        ]
    )
    pdf.h2("A simple daily shape")
    pdf.table(
        ["Block", "Do this", "Stop rule"],
        [
            [
                "Start (10 min)",
                "Name today's one application or follow-up. Do a 5-minute breathing reset if you feel spiked.",
                "Do not open LinkedIn first.",
            ],
            [
                "Deep work (60-90 min)",
                "One tailored application or one portfolio/resume fix — not both.",
                "Timer ends the block even if the file is imperfect.",
            ],
            [
                "Admin (20 min)",
                "Track sends, schedule one follow-up, file the role.",
                "No new tabs for 'maybe later' roles.",
            ],
            [
                "Close (5 min)",
                "Log the completed action. Shut the laptop on time.",
                "No 'just one more' after the window.",
            ],
        ],
        [36, 84, 60],
    )

    pdf.h2("What not to do this week")
    pdf.bullets(
        [
            "Do not double volume 'to catch up.' Catch-up math is how the stall started.",
            "Do not rebuild your entire personal brand in seven days. Pick one artifact.",
            "Do not isolate completely. One low-pressure human contact counts as recovery, not as weakness.",
            "Do not use alcohol or extra stimulants as the recovery plan.",
            "Do not treat a quiet inbox as proof you should work until midnight.",
        ]
    )

    pdf.h2("Boundary language you can actually send")
    pdf.body(
        "Burnout often hides behind over-availability. These lines protect quality without "
        "explaining your whole inner life:"
    )
    pdf.bullets(
        [
            '"I can send a stronger version tomorrow morning."',
            '"I am at capacity today. I can revisit this at 3 PM."',
            '"I am focusing on a smaller set of roles this week so I can be more specific."',
            '"I need to keep this to 20 minutes — what would be most useful?"',
        ]
    )

    pdf.h2("Week two: how to re-enter without snapping back")
    pdf.body(
        "If sleep improved and cynicism dropped even one point, keep the constraints that "
        "caused it. Add load slowly."
    )
    pdf.table(
        ["If week one did this", "Week two adjustment"],
        [
            [
                "Sleep and focus improved",
                "Keep the hour cap. Add at most one extra application or one extra networking message, not both.",
            ],
            [
                "Scores barely moved",
                "Keep the recovery week a second time. Change a different lever (sleep or social) instead of adding volume.",
            ],
            [
                "You felt worse, or daily function dropped",
                "Stop self-managing with this PDF alone. Talk with a clinician, EAP, or trusted health professional.",
            ],
        ],
        [70, 110],
    )
    pdf.body(
        "Momentum rule: consistency beats intensity. Three sustainable days outperform one "
        "heroic day and a collapse. Revisit this guide weekly. Keep the constraints that "
        "restored sleep. Retire the ones that were only guilt in disguise."
    )
    return pdf


def build_rejection() -> WellnessPDF:
    pdf = WellnessPDF("Wellness Education", "Rejection Recovery Framework")
    pdf.add_page()
    pdf.h1(
        "Rejection Recovery Framework",
        "A same-week structure to stabilize after a no, learn one signal, and re-engage without losing momentum",
    )
    pdf.body(
        "A no is a market event, not a verdict on your worth. It can still land like one. "
        "You spent hours on an application. You pictured the team. Then the email is short, "
        "or there is no email at all. This guide is a same-week education sequence so the "
        "rejection gets processed as data, not as a story about who you are."
    )
    pdf.callout(
        "What this is — and what it is not",
        "This is wellness education for ordinary job-search rejection, ghosting, and 'we "
        "went another direction' messages. It is not therapy, grief counseling, or treatment "
        "for depression, trauma, or panic. It will not tell you why a specific employer said "
        "no. If a rejection triggers thoughts of harming yourself, contact emergency help "
        "now. In the U.S., call or text 988.",
    )

    pdf.h2("Why a no hits harder than the facts")
    pdf.body(
        "Hiring is a noisy filter. Strong candidates hear no for reasons they will never "
        "see: an internal hire, a frozen budget, a different skill mix, a panel that could "
        "not agree. Your nervous system does not score those as 'process.' It scores them "
        "as social threat. The useful move is not to pretend you do not care. It is to keep "
        "the event specific so it cannot swallow your identity."
    )
    pdf.bullets(
        [
            "Sunk effort: hours of work with no visible result, so the brain looks for someone to blame.",
            "Silence: ghosting removes closure, which is often harder than a clear no.",
            "Identity load: 'they did not pick me' becomes 'I am not pickable' unless you separate them.",
            "Comparison: other people's offer posts arrive in the same week as your rejection.",
            "Ambiguity: without a reason, the mind invents the harshest one available.",
        ]
    )

    pdf.h2("Name the event before you interpret it")
    pdf.body(
        "Write one factual sentence first. If you cannot write it without a global judgment, "
        "you are still in the spike. Use the 5-Minute Breathing Reset, then come back."
    )
    pdf.table(
        ["Event type", "A specific sentence", "A sentence that usually makes it worse"],
        [
            [
                "Explicit rejection",
                '"I was not selected for the analyst role at Company X after the second interview."',
                '"I am not good enough for this field."',
            ],
            [
                "Ghosting after a process",
                '"They have not replied in 12 days after saying I would hear by Friday."',
                '"They are ignoring me because I embarrassed myself."',
            ],
            [
                "Early screen no",
                '"The recruiter declined after the 20-minute call."',
                '"I always fail first conversations."',
            ],
            [
                "Offer given to someone else",
                '"They chose another candidate for the role I wanted."',
                '"Someone else will always beat me."',
            ],
        ],
        [38, 76, 66],
    )

    pdf.h2("The same-week sequence")
    pdf.body(
        "Keep the week small on purpose. The goal is not to 'get over it.' The goal is to "
        "stabilize, extract one usable signal, change one artifact, and take one next action. "
        "If you skip Stabilize and jump to Rebuild, you usually rewrite the whole resume in "
        "a spiked state."
    )
    pdf.table(
        ["When", "Phase", "What good-enough looks like"],
        [
            [
                "Same day",
                "1. Stabilize",
                "You have named the event in one sentence. You have not sent a reply, a rant, or a new application yet.",
            ],
            [
                "Day 1",
                "2. Normalize",
                "You can say: this is common in hiring. Outcome is one decision. Identity is still your skills and values.",
            ],
            [
                "Day 1-2",
                "3. Learn",
                "You picked one gap type (fit, evidence, or timing) or honestly wrote 'unknown.' You did not need a full postmortem.",
            ],
            [
                "Day 2-3",
                "4. Rebuild",
                "One artifact changed: one bullet, one intro line, or one portfolio sentence. Not a brand overhaul.",
            ],
            [
                "Day 3+",
                "5. Re-engage",
                "One application or one networking message is sent. Actions are logged for the week, not moods.",
            ],
        ],
        [28, 36, 116],
    )

    pdf.h2("Phase 1 — Stabilize (same day)")
    pdf.body(
        "Do not use the first hour to prove you are fine. Use it to keep the spike from "
        "making the next decision."
    )
    pdf.bullets(
        [
            "Pause 10 minutes before any reply, follow-up, or new application. A timer is more reliable than willpower.",
            'Write the event sentence on paper: "I was rejected for role X." No extra clauses.',
            "If your body is spiked, run the 5-minute breathing reset, then eat or walk before you open the job board.",
            "Tell one trusted person the fact, not the story, if you have someone safe. Isolation turns a no into a loop.",
            "Do not send the email you drafted while angry. Save it overnight. Most do not need to be sent.",
        ]
    )

    pdf.h2("Phase 2 — Normalize (day 1)")
    pdf.body(
        "Rejection is a standard output of a search, not a rare personal failure. Markets "
        "with many applicants produce many nos for people who later get hired elsewhere. "
        "Normalizing is not pretending it did not hurt. It is refusing to let one employer "
        "write your identity."
    )
    pdf.table(
        ["Keep this distinction", "Leave this alone"],
        [
            [
                "Identity: skills, values, how you treat people, what you can still practice",
                "Outcome: one team's decision in one week, with information you do not have",
            ],
            [
                "Process: you completed an application or interview you can name",
                "Mind-reading: guessing the panel's private ranking of you",
            ],
            [
                "Next experiment: one change you can test on the next role",
                "Global rule: 'this always happens' or 'I never get chosen'",
            ],
        ],
        [90, 90],
    )

    pdf.h2("Phase 3 — Learn (day 1-2)")
    pdf.body(
        "Most rejections do not come with useful feedback. Do not invent a 12-point autopsy. "
        "Sort into one of three buckets, or choose unknown. Unknown is a valid, adult answer."
    )
    pdf.table(
        ["Gap type", "It might look like", "One experiment, not a personality change"],
        [
            [
                "Fit",
                "The role needed a domain you do not have yet, or the team wanted a different seniority.",
                "Tighten targeting. Apply where your last 3-5 years match 70% of the must-haves.",
            ],
            [
                "Evidence",
                "You have the skill, but the resume, portfolio, or answers did not show it clearly.",
                "Add one proof: a metric, a before/after, or a 4-line story for the weakest answer.",
            ],
            [
                "Timing",
                "Budget, an internal candidate, or a pause you cannot see.",
                "Do not overhaul materials. Re-engage the search. Follow up once, then close the loop.",
            ],
            [
                "Unknown",
                "No feedback, or feedback too vague to act on.",
                "Keep volume and quality steady. Do not treat silence as a secret flaw list.",
            ],
        ],
        [32, 74, 74],
    )
    pdf.body(
        "Two questions are enough: Which part of my story was strongest? What one improvement "
        "has the highest leverage? If you cannot answer the second without guessing, you are "
        "in Unknown. Move to Rebuild with a small, reversible change."
    )

    pdf.h2("Phase 4 — Rebuild (day 2-3)")
    pdf.body(
        "Change one item only. A spiked brain wants a full redesign because that feels like "
        "control. A reliable search changes one artifact and tests it on the next application."
    )
    pdf.bullets(
        [
            "Pick one: a resume bullet, the intro pitch, or one portfolio line. Write the new version in 20 minutes.",
            "Share that one item with a trusted reviewer if you have one. Ask 'what is unclear?' not 'am I impressive?'",
            "Schedule one easy-win action for the next day before you close the laptop.",
            "If you cannot choose one item, you are still in Stabilize. Do not Rebuild yet.",
        ]
    )

    pdf.h2("Phase 5 — Re-engage (day 3+)")
    pdf.body(
        "Re-entry is a small send, not a heroic catch-up. Track actions for one week, not "
        "how confident you felt when you sent them."
    )
    pdf.table(
        ["Do this", "Stop rule"],
        [
            [
                "Send one new application or one networking message that is already a fit",
                "Do not send five 'to make up for the no' in the same evening",
            ],
            [
                "Log the action: date, role or person, what you sent",
                "Do not log mood as if it were a performance review",
            ],
            [
                "Keep yesterday's hour cap if you have been using the burnout guide",
                "Do not reopen LinkedIn to compare offer posts before the send",
            ],
        ],
        [96, 84],
    )
    pdf.callout(
        "Reliability note",
        "This framework will not make a tight market easy, and it will not replace sleep, "
        "food, or human support. If rejections pile up and daily function drops, use Job "
        "Search Burnout Signals for load, not more self-critique. If low mood, panic, or "
        "hopelessness lasts most days for two weeks, talk with a licensed clinician or your "
        "employee assistance program.",
    )

    pdf.h2("Common mistakes that stall recovery")
    pdf.table(
        ["Mistake", "What to do instead"],
        [
            [
                "Rewriting the entire resume the night of the rejection",
                "Stabilize first. Change one bullet after you can write the event in one sentence.",
            ],
            [
                "Sending an immediate reply that explains, begs, or argues",
                "Draft if you must. Wait until the next day. Most replies are not required.",
            ],
            [
                "Disappearing from the search for two weeks, then bursting",
                "Take the same day off the board. Re-enter with one action on day 3.",
            ],
            [
                "Collecting every no into a personality story",
                "Keep a count of completed actions alongside nos. Volume of tries is not shame.",
            ],
            [
                "Asking five people 'what is wrong with me?'",
                "Ask one person about one artifact: 'Is this bullet clear?'",
            ],
        ],
        [82, 98],
    )

    pdf.h2("Same-week worksheet")
    pdf.body(
        "Fill this once per rejection you want to process. If you cannot fill a row, that "
        "row is the current phase. Do not skip ahead."
    )
    pdf.table(
        ["Field", "Write it here"],
        [
            ["Event (one factual sentence)", ""],
            ["Date I heard the no", ""],
            ["First body/attention reaction (not a story)", ""],
            ["Gap type: fit, evidence, timing, or unknown", ""],
            ["Strongest part of my story in this process", ""],
            ["One change I will make (one artifact only)", ""],
            ["Next action within 24 hours of Rebuild", ""],
            ["Action actually sent (date)", ""],
        ],
        [78, 102],
    )

    pdf.h2("Language you can use")
    pdf.bullets(
        [
            'To yourself: "This is a no on this role, on this date. It is not a no on me."',
            'To a friend: "I heard back from Company X. I am disappointed. I am taking tonight off the search."',
            'Optional follow-up, next day: "Thank you for the update. If you have one specific note I could use, I would welcome it. Either way, I appreciate the time."',
            'To a reviewer: "Here is one bullet I want to make clearer after this process. What is still vague?"',
        ]
    )
    return pdf


def write_pdf(pdf: WellnessPDF, name: str) -> Path:
    out = DATA / name
    pdf.output(str(out))
    return out


def thumbnail(pdf_path: Path, png_name: str) -> Path:
    doc = fitz.open(pdf_path)
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    out = PUBLIC / png_name
    pix.save(str(out))
    return out


def main():
    DATA.mkdir(parents=True, exist_ok=True)
    jobs = [
        (build_breathing(), "5-minute-breathing-reset.pdf", "5-minute-breathing-reset.png"),
        (build_burnout(), "job-search-burnout-signals.pdf", "job-search-burnout-signals.png"),
        (build_rejection(), "rejection-recovery-framework.pdf", "rejection-recovery-framework.png"),
    ]
    for pdf, pdf_name, png_name in jobs:
        path = write_pdf(pdf, pdf_name)
        thumb = thumbnail(path, png_name)
        print(path.name, path.stat().st_size, fitz.open(path).page_count, "pages;", thumb.name)


if __name__ == "__main__":
    main()
