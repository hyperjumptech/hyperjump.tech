#!/usr/bin/env python3
"""Generate bilingual two-page OneAI promo PDFs for public downloads."""

from __future__ import annotations

import re
from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "public" / "documents"
NAVY = HexColor("#0A0E27")
PURPLE = HexColor("#635BFF")
TEAL = HexColor("#00A3A1")
INK = HexColor("#0A2540")
MUTED = HexColor("#5B6575")
RULE = HexColor("#D8DEE6")
CARD = HexColor("#F6F8F9")
AMBER = HexColor("#B4534A")
PAGE_W, PAGE_H = A4
MARGIN = 36

EN = {
    "file": "oneai-promo-en.pdf",
    "place": "JAKARTA · INDONESIA",
    "eyebrow": "UNIFIED ENTERPRISE AI",
    "lede": "One AI platform for your entire company. On your servers, or isolated on ours.",
    "proofs": [
        "Centralized dashboard",
        "One budget for everyone",
        "Latest models on release",
        "On-prem, or isolated hosting",
        "Jakarta-based support",
    ],
    "pillars": [
        (
            "01 · CONTROL",
            "Data stays with you",
            "Installed on your servers. We maintain it. Or an isolated instance on our servers, never shared with another company. ZDR: data is not stored for model training.",
        ),
        (
            "02 · BUDGET",
            "One invoice for all",
            "Pay once per month for every employee. No individual AI stipends that are hard to track or reconcile.",
        ),
        (
            "03 · CAPACITY",
            "Latest models, fast",
            "Access current AI models as they launch: OpenAI, Anthropic, DeepSeek, and more. Admins choose which models each team can use.",
        ),
    ],
    "cap_label": "WHAT YOUR TEAM CAN DO",
    "caps": [
        ("Read & create office files", "DOCX, PPTX, XLSX, and PDF from AI commands."),
        ("Write & run code", "AI writes and executes code for complex tasks."),
        ("Browse the web", "Search for up-to-date information."),
        ("Shared knowledge", "Answers from your company documents."),
        ("Speech to text", "Voice into meeting notes and documentation."),
        ("Text to speech", "Natural speech for audio and assistants."),
    ],
    "plan_kicker": "PLAN · UP TO 40 USERS",
    "price": "Rp12.400.000 / month",
    "plan_meta": "Billed quarterly · Rp37.200.000  ·  Save 10% annually",
    "includes": "On-prem install (we maintain it) or isolated managed server. USD 300 AI credit, 1× onboarding, monthly reports. Custom SSO scoped separately.",
    "compare_kicker": "COMPARE",
    "compare_title": "Individual AI stipends usually fail",
    "compare_items": [
        "Usage cannot be verified",
        "Funds may not be spent on AI",
        "Extra admin overhead, higher cost",
        "No centralized control",
        "Data leaves on 40 personal accounts",
    ],
    "p2_kicker": "ONEAI · COMPARISON",
    "p2_eyebrow": "WHY A CHATGPT SEAT IS NOT THE SAME PRODUCT",
    "p2_heading": "ChatGPT seats cost less for small teams. Choose OneAI for control, multiple models, one budget across providers, and data that stays with you.",
    "not_kicker": "NOT FOR YOU IF",
    "not_title": "Fewer than 20 people with chat-only needs",
    "not_text": "ChatGPT Plus or Business is usually enough and cheaper. OneAI is not meant to replace personal subscriptions at that scale.",
    "fit_kicker": "GOOD FIT IF",
    "fit_title": "20-40 people who need one platform",
    "fit_text": "Rp12,400,000 for up to 40 users, including USD 300 credit across providers, with on-prem or isolated hosting and multi-model access. Prices at 40 annual ChatGPT seats are close.",
    "table_label": "COST AND CAPABILITY COMPARISON · PER MONTH",
    "cols": ["", "Individual stipends", "ChatGPT Business", "OneAI"],
    "rows": [
        ["20 users", "Rp10,000,000", "Rp8.0M / Rp6.4M yr", "Rp12,400,000"],
        ["40 users", "Rp20,000,000", "Rp16.0M / Rp12.8M yr", "Rp12,400,000 · fixed"],
        ["Usage across providers", "No", "Included in ChatGPT", "USD 300 pool"],
        ["Single invoice & reports", "No", "ChatGPT only", "Yes · all models"],
        ["Admin chooses models", "No", "OpenAI only", "Yes · all vendors"],
        ["Multi-model", "Depends", "OpenAI only", "Yes"],
        ["Zero Data Retention", "No", "No training · not ZDR", "Yes"],
        ["On-prem or isolated host", "No", "Vendor cloud", "Yes"],
        ["Knowledge, files, code", "No", "Yes · ChatGPT", "Yes · all models"],
        ["Support in Indonesia", "No", "Overseas queue", "Yes · Jakarta team"],
    ],
    "assumptions": "Assumptions: Rp16,000/USD. Stipend example Rp500,000/person. ChatGPT Business $25/user monthly or $20/user annually. USD 300 ≈ Rp4,800,000. ChatGPT includes model usage; extra credits are optional. Competitor prices may change; not their quotes.",
    "whys": [
        (
            "Stipends often don't become AI",
            "Money in employee accounts can be spent on anything. No reporting, no audit, no policy.",
        ),
        (
            "Seat price is not the product",
            "At 40 seats ChatGPT is ~Rp16M monthly or ~Rp12.8M annually. OneAI stays at Rp12.4M. Prices are close; buy the platform.",
        ),
        (
            "ChatGPT already has files and code",
            "Knowledge, files, code, and admin controls are in ChatGPT Business. OneAI adds multi-model, on-prem, and one budget across vendors.",
        ),
    ],
    "support_kicker": "SUPPORT IN INDONESIA",
    "support_title": "If your company is in Indonesia, we are already next door",
    "support_text": "Same timezone, Bahasa Indonesia, and on-site when it matters. Support from companies like OpenAI will never feel like that.",
    "contact": "Contact solution@hyperjump.tech",
    "footer": "PT Artha Rajamas Mandiri · Hyperjump Technology",
}

ID = {
    "file": "oneai-promo-id.pdf",
    "place": "JAKARTA · INDONESIA",
    "eyebrow": "AI ENTERPRISE DALAM SATU PLATFORM",
    "lede": "Satu platform AI untuk semua tim—di server Anda sendiri atau terisolasi di server kami.",
    "proofs": [
        "Dashboard terpusat",
        "Satu anggaran untuk semua",
        "Model terbaru begitu rilis",
        "On-premise, atau hosting terisolasi",
        "Support dari tim Jakarta",
    ],
    "pillars": [
        (
            "01 · KONTROL",
            "Data tidak ke mana-mana",
            "Dipasang langsung di server Anda—kami yang merawat. Atau instance terisolasi di server kami, khusus perusahaan Anda. Dengan ZDR, data tidak dipakai untuk melatih model.",
        ),
        (
            "02 · ANGGARAN",
            "Satu tagihan untuk semua",
            "Cukup bayar sekali sebulan untuk seluruh karyawan. Tanpa repot mengurus allowance AI perorangan yang sulit dilacak.",
        ),
        (
            "03 · KAPASITAS",
            "Model terbaru, tanpa menunggu",
            "Pakai model AI terkini begitu diluncurkan: OpenAI, Anthropic, DeepSeek, dan lainnya. Admin menentukan model untuk tiap tim.",
        ),
    ],
    "cap_label": "YANG BISA DIKERJAKAN TIM ANDA",
    "caps": [
        ("Baca & buat file kantor", "DOCX, PPTX, XLSX, & PDF lewat perintah AI."),
        ("Tulis & jalankan kode", "AI menulis dan menjalankan kode."),
        ("Jelajahi internet", "Cari informasi terbaru yang akurat."),
        ("Basis pengetahuan bersama", "Jawaban dari dokumen internal perusahaan."),
        ("Speech to text", "Ubah suara jadi teks & notulen."),
        ("Text to speech", "Suara natural untuk audio & asisten."),
    ],
    "plan_kicker": "PAKET · HINGGA 40 PENGGUNA",
    "price": "Rp12.400.000 / bulan",
    "plan_meta": "Ditagih tiap 3 bulan · Rp37.200.000  ·  Hemat 10% tahunan",
    "includes": "Dipasang on-premise (perawatannya kami tangani) atau di server terkelola terisolasi. Termasuk kredit AI USD 300, 1× onboarding, dan laporan bulanan. SSO khusus dibahas terpisah.",
    "compare_kicker": "BANDINGKAN",
    "compare_title": "Allowance AI perorangan biasanya bikin repot",
    "compare_items": [
        "Pemakaian sulit diverifikasi",
        "Dana belum tentu dipakai untuk AI",
        "Administrasi bertambah, biaya membengkak",
        "Tidak ada kontrol terpusat",
        "Data tersebar di 40 akun pribadi",
    ],
    "p2_kicker": "ONEAI · PERBANDINGAN",
    "p2_eyebrow": "KENAPA KURSI CHATGPT ITU PRODUK BERBEDA",
    "p2_heading": "Untuk tim kecil, kursi ChatGPT memang lebih murah. Pilih OneAI kalau Anda butuh kontrol, banyak model, satu anggaran lintas penyedia, dan data yang tetap di lingkungan Anda.",
    "not_kicker": "BELUM UNTUK ANDA JIKA",
    "not_title": "Tim di bawah 20 orang yang cukup pakai chat",
    "not_text": "Untuk tim sekecil itu, ChatGPT Plus atau Business biasanya sudah cukup dan lebih hemat. OneAI memang bukan pengganti langganan pribadi di skala ini.",
    "fit_kicker": "COCOK JIKA",
    "fit_title": "20-40 orang yang butuh satu platform",
    "fit_text": "Satu tagihan Rp12.400.000 untuk hingga 40 pengguna, termasuk kredit USD 300 lintas penyedia, plus hosting on-premise atau terisolasi dan akses multi-model. Dibanding 40 kursi ChatGPT tahunan, selisihnya tipis.",
    "table_label": "PERBANDINGAN BIAYA DAN KEMAMPUAN · PER BULAN",
    "cols": ["", "Allowance individu", "ChatGPT Business", "OneAI"],
    "rows": [
        ["20 pengguna", "Rp10.000.000", "Rp8,0 jt / Rp6,4 jt thn", "Rp12.400.000"],
        ["40 pengguna", "Rp20.000.000", "Rp16,0 jt / Rp12,8 jt thn", "Rp12.400.000 · tetap"],
        ["Pemakaian lintas penyedia", "Tidak", "Termasuk di ChatGPT", "USD 300 lintas"],
        ["Satu tagihan & laporan", "Tidak", "Hanya ChatGPT", "Ya · semua model"],
        ["Admin pilih model", "Tidak", "OpenAI saja", "Ya · semua vendor"],
        ["Multi-model", "Tergantung", "OpenAI saja", "Ya"],
        ["Zero Data Retention", "Tidak", "Tanpa training · bukan ZDR", "Ya"],
        ["On-premise / terisolasi", "Tidak", "Cloud vendor", "Ya"],
        ["Pengetahuan, file, kode", "Tidak", "Ya · ChatGPT", "Ya · semua model"],
        ["Support di Indonesia", "Tidak", "Antrean luar negeri", "Ya · tim Jakarta"],
    ],
    "assumptions": "Asumsi: kurs Rp16.000/USD. Contoh allowance Rp500.000/orang. ChatGPT Business $25/orang bulanan atau $20/orang tahunan. USD 300 ≈ Rp4.800.000. ChatGPT sudah termasuk pemakaian model; kredit tambahan opsional. Harga kompetitor bisa berubah; bukan penawaran resmi mereka.",
    "whys": [
        (
            "Allowance sering tidak berujung jadi AI",
            "Uang yang sudah di rekening karyawan bisa dipakai untuk apa saja—tanpa laporan, audit, atau kontrol kebijakan.",
        ),
        (
            "Harga kursi bukan produknya",
            "Untuk 40 pengguna, ChatGPT ~Rp16 jt/bulan atau ~Rp12,8 jt/tahun. OneAI tetap Rp12,4 jt. Selisihnya tipis—ambil platformnya.",
        ),
        (
            "ChatGPT sudah punya file dan kode",
            "Pengetahuan, file, kode, dan kontrol admin sudah ada di ChatGPT Business. OneAI melengkapinya dengan multi-model, on-premise, dan satu anggaran lintas vendor.",
        ),
    ],
    "support_kicker": "SUPPORT DI INDONESIA",
    "support_title": "Cepat dan gampang, karena kami di Indonesia juga",
    "support_text": "Zona waktu yang sama, Bahasa Indonesia, dan bisa datang ke kantor Anda. Support dari perusahaan seperti OpenAI tidak akan seperti itu.",
    "contact": "Hubungi solution@hyperjump.tech",
    "footer": "PT Artha Rajamas Mandiri · Hyperjump Technology",
}


def wrap(c: canvas.Canvas, text: str, font: str, size: float, max_w: float) -> list[str]:
    """Split text into lines that fit max_w."""
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if c.stringWidth(trial, font, size) <= max_w:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


_TOKEN = re.compile(r"\S+|\s+")
_OBLIQUE_FONTS = {
    "Helvetica": "Helvetica-Oblique",
    "Helvetica-Bold": "Helvetica-BoldOblique",
}


def italic_font(font: str) -> str:
    """Return the italic counterpart of a standard Helvetica font."""
    return _OBLIQUE_FONTS.get(font, font)


def is_allowance_token(token: str) -> bool:
    """Return True when a drawn token is the loanword allowance."""
    return token.strip(".,:;!?\"'").lower() == "allowance"


def draw_copy_string(
    c: canvas.Canvas, x: float, y: float, text: str, font: str, size: float
) -> None:
    """Draw one line of copy, italicizing the loanword allowance."""
    cursor = x
    for token in _TOKEN.findall(text):
        token_font = italic_font(font) if is_allowance_token(token) else font
        c.setFont(token_font, size)
        c.drawString(cursor, y, token)
        cursor += c.stringWidth(token, token_font, size)


def draw_footer(c: canvas.Canvas, copy: dict, page: str) -> None:
    """Draw contact, company, and page number on the bottom edge."""
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN, 22, copy["contact"])
    c.drawCentredString(PAGE_W / 2, 22, copy["footer"])
    c.drawRightString(PAGE_W - MARGIN, 22, page)


def page_one(c: canvas.Canvas, copy: dict) -> None:
    """Draw the product overview page."""
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(PURPLE)
    c.rect(0, 0, 8, PAGE_H, fill=1, stroke=0)

    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 40, "HYPERJUMP TECHNOLOGY")
    c.setFillColor(HexColor("#8A93A6"))
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 40, copy["place"])

    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 36)
    c.drawString(MARGIN, PAGE_H - 92, "OneAI")
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 110, copy["eyebrow"])
    c.setFillColor(HexColor("#C5CBD8"))
    c.setFont("Helvetica", 11)
    y = PAGE_H - 136
    for line in wrap(c, copy["lede"], "Helvetica", 11, PAGE_W - 2 * MARGIN - 8):
        c.drawString(MARGIN, y, line)
        y -= 15

    y -= 8
    c.setFillColor(white)
    c.setFont("Helvetica", 10)
    for proof in copy["proofs"]:
        c.setFillColor(TEAL)
        c.circle(MARGIN + 4, y + 3, 3, fill=1, stroke=0)
        c.setFillColor(white)
        c.drawString(MARGIN + 16, y, proof)
        y -= 16

    y -= 10
    card_w = (PAGE_W - 2 * MARGIN - 16) / 3
    card_h = 132
    for i, (kicker, title, body) in enumerate(copy["pillars"]):
        x = MARGIN + i * (card_w + 8)
        c.setFillColor(HexColor("#12183A"))
        c.roundRect(x, y - card_h, card_w, card_h, 8, fill=1, stroke=0)
        c.setFillColor(PURPLE)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 10, y - 18, kicker)
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x + 10, y - 36, title)
        c.setFillColor(HexColor("#C5CBD8"))
        c.setFont("Helvetica", 8)
        ty = y - 54
        for line in wrap(c, body, "Helvetica", 8, card_w - 20):
            draw_copy_string(c, x + 10, ty, line, "Helvetica", 8)
            ty -= 11

    y = y - card_h - 22
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(MARGIN, y, copy["cap_label"])
    y -= 18
    cap_w = (PAGE_W - 2 * MARGIN - 16) / 3
    for i, (title, body) in enumerate(copy["caps"]):
        col, row = i % 3, i // 3
        x = MARGIN + col * (cap_w + 8)
        cy = y - row * 48
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(x, cy, title)
        c.setFillColor(HexColor("#C5CBD8"))
        c.setFont("Helvetica", 8)
        c.drawString(x, cy - 13, body)

    band_top = 168
    c.setFillColor(HexColor("#12183A"))
    c.rect(0, 36, PAGE_W, band_top, fill=1, stroke=0)
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(MARGIN, 36 + band_top - 18, copy["plan_kicker"])
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN, 36 + band_top - 42, copy["price"])
    c.setFillColor(HexColor("#C5CBD8"))
    c.setFont("Helvetica", 9)
    c.drawString(MARGIN, 36 + band_top - 58, copy["plan_meta"])
    ty = 36 + band_top - 76
    for line in wrap(c, copy["includes"], "Helvetica", 8, 300):
        c.drawString(MARGIN, ty, line)
        ty -= 11

    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(360, 36 + band_top - 18, copy["compare_kicker"])
    c.setFillColor(white)
    draw_copy_string(
        c, 360, 36 + band_top - 36, copy["compare_title"], "Helvetica-Bold", 10
    )
    c.setFont("Helvetica", 8)
    c.setFillColor(HexColor("#C5CBD8"))
    iy = 36 + band_top - 54
    for item in copy["compare_items"]:
        c.setFillColor(AMBER)
        c.rect(360, iy + 2, 8, 2, fill=1, stroke=0)
        c.setFillColor(HexColor("#C5CBD8"))
        c.drawString(372, iy, item)
        iy -= 14

    draw_footer(c, copy, "1 / 2")


def page_two(c: canvas.Canvas, copy: dict) -> None:
    """Draw the comparison page."""
    c.setFillColor(white)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(PURPLE)
    c.rect(0, 0, 8, PAGE_H, fill=1, stroke=0)

    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, PAGE_H - 40, copy["p2_kicker"])
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(MARGIN, PAGE_H - 58, copy["p2_eyebrow"])
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 14)
    y = PAGE_H - 80
    for line in wrap(c, copy["p2_heading"], "Helvetica-Bold", 14, PAGE_W - 2 * MARGIN):
        c.drawString(MARGIN, y, line)
        y -= 18

    box_w = (PAGE_W - 2 * MARGIN - 10) / 2
    box_h = 100
    for i, (kicker, title, body, fill) in enumerate(
        [
            (copy["not_kicker"], copy["not_title"], copy["not_text"], HexColor("#F7F1EF")),
            (copy["fit_kicker"], copy["fit_title"], copy["fit_text"], HexColor("#EEF5FB")),
        ]
    ):
        x = MARGIN + i * (box_w + 10)
        c.setFillColor(fill)
        c.roundRect(x, y - box_h, box_w, box_h, 6, fill=1, stroke=0)
        c.setFillColor(PURPLE if i == 1 else AMBER)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 10, y - 16, kicker)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x + 10, y - 32, title)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        ty = y - 48
        for line in wrap(c, body, "Helvetica", 8, box_w - 20):
            c.drawString(x + 10, ty, line)
            ty -= 11

    y = y - box_h - 22
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(MARGIN, y, copy["table_label"])
    y -= 16

    cols = copy["cols"]
    rows = copy["rows"]
    table_w = PAGE_W - 2 * MARGIN
    col_w = [table_w * 0.28, table_w * 0.24, table_w * 0.24, table_w * 0.24]
    row_h = 18
    x0 = MARGIN
    # header
    c.setFillColor(NAVY)
    c.rect(x0, y - row_h, table_w, row_h, fill=1, stroke=0)
    c.setFillColor(white)
    x = x0
    for i, col in enumerate(cols):
        draw_copy_string(c, x + 4, y - 12, col, "Helvetica-Bold", 7)
        x += col_w[i]
    y -= row_h
    for r, row in enumerate(rows):
        bg = HexColor("#EEF0FF") if r % 2 else CARD
        c.setFillColor(bg)
        c.rect(x0, y - row_h, table_w, row_h, fill=1, stroke=0)
        x = x0
        for i, cell in enumerate(row):
            c.setFillColor(PURPLE if i == 3 else INK)
            c.setFont("Helvetica-Bold" if i in (0, 3) else "Helvetica", 7)
            c.drawString(x + 4, y - 12, cell)
            x += col_w[i]
        y -= row_h

    y -= 10
    c.setFillColor(MUTED)
    for line in wrap(c, copy["assumptions"], "Helvetica", 7, table_w):
        draw_copy_string(c, MARGIN, y, line, "Helvetica", 7)
        y -= 10

    y -= 10
    band_h = 78
    c.setFillColor(NAVY)
    c.roundRect(MARGIN, y - band_h, table_w, band_h, 6, fill=1, stroke=0)
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(MARGIN + 12, y - 16, copy["support_kicker"])
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 11)
    title_lines = wrap(
        c, copy["support_title"], "Helvetica-Bold", 11, table_w - 24
    )
    ty = y - 32
    for line in title_lines:
        c.drawString(MARGIN + 12, ty, line)
        ty -= 14
    c.setFillColor(HexColor("#C5CBD8"))
    c.setFont("Helvetica", 8)
    for line in wrap(c, copy["support_text"], "Helvetica", 8, table_w - 24):
        c.drawString(MARGIN + 12, ty, line)
        ty -= 11
    y = y - band_h - 12

    why_w = (PAGE_W - 2 * MARGIN - 16) / 3
    why_h = 84
    for i, (title, body) in enumerate(copy["whys"]):
        x = MARGIN + i * (why_w + 8)
        c.setFillColor(CARD)
        c.roundRect(x, y - why_h, why_w, why_h, 6, fill=1, stroke=0)
        c.setFillColor(INK)
        ty = y - 16
        for line in wrap(c, title, "Helvetica-Bold", 9, why_w - 16):
            draw_copy_string(c, x + 8, ty, line, "Helvetica-Bold", 9)
            ty -= 12
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        ty -= 4
        for line in wrap(c, body, "Helvetica", 8, why_w - 16):
            c.drawString(x + 8, ty, line)
            ty -= 11

    draw_footer(c, copy, "2 / 2")


def build(copy: dict) -> Path:
    """Write one locale's two-page promo PDF."""
    path = OUT / copy["file"]
    OUT.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(path), pagesize=A4)
    c.setTitle("OneAI: Hyperjump Technology")
    c.setAuthor("Hyperjump Technology")
    page_one(c, copy)
    c.showPage()
    page_two(c, copy)
    c.save()
    return path


def main() -> None:
    for copy in (EN, ID):
        path = build(copy)
        print(f"Wrote {path.relative_to(REPO)}")


if __name__ == "__main__":
    main()
