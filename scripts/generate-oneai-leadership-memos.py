#!/usr/bin/env python3
"""Generate bilingual OneAI leadership-memo DOCX files for the public downloads folder."""

from __future__ import annotations

from pathlib import Path

from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

NAVY = RGBColor(0x0A, 0x25, 0x40)
BLUE = RGBColor(0x63, 0x5B, 0xFF)
GRAY = RGBColor(0x42, 0x54, 0x66)
MUTED = RGBColor(0x88, 0x98, 0xAA)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
RULE = "0A2540"
LIGHT_FILL = "EEF5FB"
AMBER_FILL = "FFF6D8"
ROW_ALT = "F6F8F9"
REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = REPO_ROOT / "public" / "documents"

EN = {
    "output": "oneai-leadership-memo-en.docx",
    "core_title": "OneAI leadership memo",
    "core_subject": "Recommendation to evaluate OneAI",
    "kicker": "HYPERJUMP TECHNOLOGY",
    "brand": "OneAI",
    "doc_type": "Internal memo  ·  send to your manager or leadership",
    "instruction": (
        "How to use this file: replace every [bracketed] field, attach the "
        "OneAI two-page PDF overview, then delete this yellow box before you send."
    ),
    "fields": [
        ("To", "[Name], [Title]"),
        ("From", "[Your name], [Role / department]"),
        ("Date", "[Date]"),
        (
            "Subject",
            "Recommendation to evaluate OneAI as our company AI platform",
        ),
        ("Attachments", "OneAI two-page overview (PDF)"),
    ],
    "request_heading": "1. Request",
    "request_paras": [
        (
            "I recommend we evaluate OneAI from Hyperjump Technology as our "
            "company-wide AI platform — or, at minimum, schedule a short briefing "
            "with the vendor."
        ),
        (
            "This is not a request to replace personal ChatGPT for a handful of "
            "people. It is a request to decide how we will govern AI once 20–40 "
            "of us are already using it."
        ),
    ],
    "why_heading": "2. Why this matters now",
    "why_intro": (
        "Teams are already using AI. Personal subscriptions, informal stipends, "
        "or buying credits ad hoc do not give us:"
    ),
    "why_points": [
        (
            "Control",
            "one dashboard, usage reports, and a way to choose which models are available.",
        ),
        (
            "A single budget",
            "one invoice instead of 20–40 subscriptions and unverified stipends.",
        ),
        (
            "A clear data posture",
            "Zero Data Retention (ZDR), so company data is not kept for model training.",
        ),
        (
            "Real capability",
            "office files, internal knowledge, code execution, and more than one model vendor.",
        ),
    ],
    "why_close": (
        "Money given as a stipend can be spent on anything. We pay for capacity "
        "we cannot see, and we cannot enforce company policy."
    ),
    "why_oneai_heading": "3. Why OneAI, specifically",
    "why_oneai_intro": (
        "OneAI is a unified platform for up to 40 users. Published commercial "
        "terms (before tax):"
    ),
    "plan_points": [
        "Rp12.400.000 / month, billed quarterly (Rp37.200.000 per quarter).",
        "USD 300 AI credit included each month.",
        "10% off with annual billing.",
        "Latest models as they launch (OpenAI, Anthropic, DeepSeek, and others); admins choose what each team can use.",
        "One team onboarding session and monthly usage reports included.",
        "Customization (internal systems, custom SSO) is scoped separately.",
    ],
    "why_oneai_close": (
        "At 40 users, ChatGPT Business is about Rp16 million / month before extra "
        "credits. OneAI stays at Rp12.4 million with credit included. The attached "
        "PDF has the full comparison table."
    ),
    "caveat_heading": "Honest caveat",
    "caveat": (
        "If we have fewer than 20 people and only need chat, ChatGPT Plus or "
        "Business is usually enough and cheaper. OneAI is meant for a company "
        "that needs one platform — control, multiple models, and one budget — "
        "not 20–40 subscriptions."
    ),
    "snapshot_heading": "4. Cost snapshot (per month)",
    "snapshot_headers": [
        "At 40 users",
        "Individual stipends",
        "ChatGPT Business",
        "OneAI",
    ],
    "snapshot_rows": [
        ["Monthly cost", "Rp20.000.000", "Rp16.000.000", "Rp12.400.000 · fixed"],
        ["AI credit", "No", "Bought separately", "USD 300 included"],
        ["ZDR", "No", "Not ZDR", "Yes"],
        ["One invoice & usage reports", "No", "ChatGPT only", "Yes · all models"],
    ],
    "snapshot_note": (
        "Assumptions in the public comparison: Rp16.000/USD; stipend example "
        "Rp500.000/person; ChatGPT Business $25/user/month. Competitor prices "
        "may change; these figures are for comparison, not their quotes. Tax is extra."
    ),
    "next_heading": "5. Proposed next step",
    "next_steps": [
        "Review the attached two-page overview.",
        "Approve a 30-minute call with Hyperjump (solution@hyperjump.tech) to confirm fit, onboarding, and commercial terms.",
        "Decide after that call — adopt, wait, or stay with the current approach.",
    ],
    "next_close": "I am happy to coordinate the conversation and report back.",
    "signoff": "Respectfully,",
    "signature_name": "[Your name]",
    "signature_role": "[Role / department]",
    "signature_contact": "[Phone / email]",
    "footer": (
        "Vendor: Hyperjump Technology · PT Artha Rajamas Mandiri · Jakarta  ·  "
        "solution@hyperjump.tech  ·  https://hyperjump.tech/en/oneai"
    ),
}

ID = {
    "output": "oneai-leadership-memo-id.docx",
    "core_title": "Memo pimpinan OneAI",
    "core_subject": "Usulan untuk mengevaluasi OneAI",
    "kicker": "HYPERJUMP TECHNOLOGY",
    "brand": "OneAI",
    "doc_type": "Memo internal  ·  kirim ke manajer atau pimpinan",
    "instruction": (
        "Cara memakai berkas ini: ganti setiap isian [dalam kurung siku], "
        "lampirkan ringkasan PDF OneAI dua halaman, lalu hapus kotak kuning ini sebelum dikirim."
    ),
    "fields": [
        ("Kepada", "[Nama Bapak/Ibu], [Jabatan]"),
        ("Dari", "[Nama Anda], [Jabatan / divisi]"),
        ("Tanggal", "[Tanggal]"),
        (
            "Perihal",
            "Usulan untuk mengevaluasi OneAI sebagai platform AI perusahaan",
        ),
        ("Lampiran", "Ringkasan OneAI dua halaman (PDF)"),
    ],
    "request_heading": "1. Permohonan",
    "request_paras": [
        (
            "Saya mengusulkan agar perusahaan mengevaluasi OneAI dari Hyperjump "
            "Technology sebagai platform AI terpadu — atau setidaknya menjadwalkan "
            "briefing singkat dengan vendor."
        ),
        (
            "Ini bukan usulan untuk mengganti ChatGPT pribadi bagi beberapa orang. "
            "Ini usulan untuk memutuskan bagaimana kita mengatur AI begitu 20–40 "
            "orang di perusahaan sudah memakainya."
        ),
    ],
    "why_heading": "2. Mengapa ini penting sekarang",
    "why_intro": (
        "Tim sudah memakai AI. Langganan pribadi, tunjangan informal, atau beli "
        "kredit secara ad hoc tidak memberi kita:"
    ),
    "why_points": [
        (
            "Kontrol",
            "satu dashboard, laporan pemakaian, dan cara memilih model yang tersedia.",
        ),
        (
            "Satu anggaran",
            "satu tagihan, bukan 20–40 langganan dan tunjangan yang tidak terverifikasi.",
        ),
        (
            "Postur data yang jelas",
            "Zero Data Retention (ZDR), sehingga data perusahaan tidak disimpan untuk training model.",
        ),
        (
            "Kapabilitas yang nyata",
            "file kantor, pengetahuan internal, eksekusi kode, dan lebih dari satu vendor model.",
        ),
    ],
    "why_close": (
        "Uang yang diberikan sebagai tunjangan bisa dipakai untuk apa saja. Kita "
        "membayar kapasitas yang tidak bisa kita lihat, dan tidak bisa menegakkan "
        "kebijakan perusahaan."
    ),
    "why_oneai_heading": "3. Mengapa OneAI",
    "why_oneai_intro": (
        "OneAI adalah platform terpadu hingga 40 pengguna. Ketentuan komersial "
        "yang dipublikasikan (sebelum pajak):"
    ),
    "plan_points": [
        "Rp12.400.000 / bulan, ditagih per kuartal (Rp37.200.000 per kuartal).",
        "Kredit AI USD 300 termasuk setiap bulan.",
        "Hemat 10% untuk pembayaran tahunan.",
        "Model terbaru saat rilis (OpenAI, Anthropic, DeepSeek, dan lainnya); admin memilih model yang boleh dipakai tiap tim.",
        "Satu sesi onboarding/orientasi tim dan laporan pemakaian bulanan termasuk.",
        "Kustomisasi (sistem internal, SSO khusus) disepakati terpisah.",
    ],
    "why_oneai_close": (
        "Di 40 pengguna, ChatGPT Business sekitar Rp16 juta / bulan sebelum kredit "
        "tambahan. OneAI tetap Rp12,4 juta dengan kredit termasuk. PDF terlampir "
        "memuat tabel perbandingan lengkap."
    ),
    "caveat_heading": "Catatan jujur",
    "caveat": (
        "Jika kita kurang dari 20 orang dan kebutuhannya hanya chat, ChatGPT Plus "
        "atau Business biasanya cukup dan lebih murah. OneAI dimaksudkan untuk "
        "perusahaan yang butuh satu platform — kontrol, banyak model, dan satu "
        "anggaran — bukan 20–40 langganan."
    ),
    "snapshot_heading": "4. Ringkasan biaya (per bulan)",
    "snapshot_headers": [
        "Di 40 pengguna",
        "Tunjangan individu",
        "ChatGPT Business",
        "OneAI",
    ],
    "snapshot_rows": [
        ["Biaya bulanan", "Rp20.000.000", "Rp16.000.000", "Rp12.400.000 · tetap"],
        ["Kredit AI", "Tidak", "Dibeli terpisah", "USD 300 termasuk"],
        ["ZDR", "Tidak", "Bukan ZDR", "Ya"],
        ["Satu tagihan & laporan", "Tidak", "Hanya ChatGPT", "Ya · semua model"],
    ],
    "snapshot_note": (
        "Asumsi di perbandingan publik: kurs Rp16.000/USD; contoh tunjangan "
        "Rp500.000/orang; ChatGPT Business $25/orang/bulan. Harga kompetitor bisa "
        "berubah; angka ini untuk perbandingan, bukan kuotasi mereka. Pajak belum termasuk."
    ),
    "next_heading": "5. Usulan langkah berikutnya",
    "next_steps": [
        "Meninjau ringkasan dua halaman terlampir.",
        "Menyetujui panggilan 30 menit dengan Hyperjump (solution@hyperjump.tech) untuk konfirmasi kesesuaian, onboarding, dan ketentuan komersial.",
        "Memutuskan setelah panggilan itu — adopsi, menunggu, atau tetap dengan pendekatan saat ini.",
    ],
    "next_close": "Saya siap mengkoordinasikan percakapan tersebut dan melapor kembali.",
    "signoff": "Hormat saya,",
    "signature_name": "[Nama Anda]",
    "signature_role": "[Jabatan / divisi]",
    "signature_contact": "[Telepon / email]",
    "footer": (
        "Vendor: Hyperjump Technology · PT Artha Rajamas Mandiri · Jakarta  ·  "
        "solution@hyperjump.tech  ·  https://hyperjump.tech/id/oneai"
    ),
}


def set_run_font(run, *, name="Calibri", size=11, bold=False, color=NAVY, italic=False):
    """Apply a consistent font to a python-docx run."""
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color


def set_paragraph_spacing(paragraph, *, before=0, after=8, line=1.15):
    """Set paragraph spacing in points."""
    paragraph.paragraph_format.space_before = Pt(before)
    paragraph.paragraph_format.space_after = Pt(after)
    paragraph.paragraph_format.line_spacing = line
    paragraph.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE


def shade_cell(cell, fill):
    """Set a table cell background hex fill."""
    tc_pr = cell._tc.get_or_add_tcPr()
    existing = tc_pr.find(qn("w:shd"))
    if existing is not None:
        tc_pr.remove(existing)
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), fill)
    shd.set(qn("w:val"), "clear")
    tc_pr.append(shd)


def set_cell_borders(cell, **edges):
    """Set individual cell borders. Each edge is (sz, color)."""
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_borders = tc_pr.find(qn("w:tcBorders"))
    if tc_borders is None:
        tc_borders = OxmlElement("w:tcBorders")
        tc_pr.append(tc_borders)
    for edge, (sz, color) in edges.items():
        element = OxmlElement(f"w:{edge}")
        element.set(qn("w:val"), "single")
        element.set(qn("w:sz"), str(sz))
        element.set(qn("w:space"), "0")
        element.set(qn("w:color"), color)
        tc_borders.append(element)


def prevent_table_indent(table):
    """Remove default table left indent so full-width tables align with body text."""
    tbl = table._tbl
    tbl_pr = tbl.tblPr
    tbl_ind = tbl_pr.find(qn("w:tblInd"))
    if tbl_ind is None:
        tbl_ind = OxmlElement("w:tblInd")
        tbl_pr.append(tbl_ind)
    tbl_ind.set(qn("w:w"), "0")
    tbl_ind.set(qn("w:type"), "dxa")


def set_table_widths(table, widths_cm):
    """Assign fixed column widths in centimeters."""
    table.autofit = False
    table.allow_autofit = False
    for row in table.rows:
        for index, width in enumerate(widths_cm):
            row.cells[index].width = Cm(width)


def add_text(paragraph, text, **font):
    """Add a run, highlighting [placeholder] tokens in amber."""
    remaining = text
    while remaining:
        start = remaining.find("[")
        end = remaining.find("]", start + 1) if start != -1 else -1
        if start == -1 or end == -1:
            run = paragraph.add_run(remaining)
            set_run_font(run, **font)
            return
        if start > 0:
            run = paragraph.add_run(remaining[:start])
            set_run_font(run, **font)
        token = remaining[start : end + 1]
        run = paragraph.add_run(token)
        highlight = {**font, "bold": True, "color": RGBColor(0x8A, 0x5A, 0x00)}
        set_run_font(run, **highlight)
        rpr = run._element.get_or_add_rPr()
        hl = OxmlElement("w:highlight")
        hl.set(qn("w:val"), "yellow")
        rpr.append(hl)
        remaining = remaining[end + 1 :]


def add_body_paragraph(doc, text, *, after=8):
    """Add a justified body paragraph."""
    paragraph = doc.add_paragraph()
    set_paragraph_spacing(paragraph, after=after)
    paragraph.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    add_text(paragraph, text, size=11, color=GRAY)
    return paragraph


def add_heading_paragraph(doc, text):
    """Add a section heading."""
    paragraph = doc.add_paragraph()
    set_paragraph_spacing(paragraph, before=14, after=6)
    run = paragraph.add_run(text)
    set_run_font(run, size=13, bold=True, color=NAVY)
    return paragraph


def add_bullet(doc, title, text):
    """Add a bold-lead bullet."""
    paragraph = doc.add_paragraph(style="List Bullet")
    set_paragraph_spacing(paragraph, after=4)
    title_run = paragraph.add_run(f"{title} — ")
    set_run_font(title_run, size=11, bold=True, color=NAVY)
    body_run = paragraph.add_run(text)
    set_run_font(body_run, size=11, color=GRAY)


def add_plain_bullet(doc, text):
    """Add a single-run bullet."""
    paragraph = doc.add_paragraph(style="List Bullet")
    set_paragraph_spacing(paragraph, after=3)
    add_text(paragraph, text, size=11, color=GRAY)


def add_header_bar(doc, copy):
    """Add the OneAI brand header."""
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    prevent_table_indent(table)
    set_table_widths(table, [16.6])
    cell = table.cell(0, 0)
    shade_cell(cell, "0A2540")
    set_cell_borders(
        cell,
        top=("0", "0A2540"),
        left=("0", "0A2540"),
        bottom=("0", "0A2540"),
        right=("0", "0A2540"),
    )
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER

    kicker = cell.paragraphs[0]
    kicker.alignment = WD_ALIGN_PARAGRAPH.LEFT
    set_paragraph_spacing(kicker, before=4, after=0)
    kicker_run = kicker.add_run(copy["kicker"])
    set_run_font(kicker_run, size=9, bold=True, color=RGBColor(0x00, 0xD4, 0xAA))

    brand = cell.add_paragraph()
    set_paragraph_spacing(brand, before=0, after=0)
    brand_run = brand.add_run(copy["brand"])
    set_run_font(brand_run, size=22, bold=True, color=WHITE)

    doc_type = cell.add_paragraph()
    set_paragraph_spacing(doc_type, before=2, after=4)
    type_run = doc_type.add_run(copy["doc_type"])
    set_run_font(type_run, size=10, color=RGBColor(0xC8, 0xD9, 0xEB))

    spacer = doc.add_paragraph()
    set_paragraph_spacing(spacer, before=0, after=8)


def add_instruction_box(doc, copy):
    """Add the yellow how-to box the sender should delete."""
    table = doc.add_table(rows=1, cols=1)
    prevent_table_indent(table)
    set_table_widths(table, [16.6])
    cell = table.cell(0, 0)
    shade_cell(cell, AMBER_FILL)
    set_cell_borders(
        cell,
        top=("8", "E6C200"),
        left=("8", "E6C200"),
        bottom=("8", "E6C200"),
        right=("8", "E6C200"),
    )
    paragraph = cell.paragraphs[0]
    set_paragraph_spacing(paragraph, before=2, after=2)
    add_text(paragraph, copy["instruction"], size=10, color=RGBColor(0x6B, 0x53, 0x00))
    spacer = doc.add_paragraph()
    set_paragraph_spacing(spacer, before=0, after=6)


def add_field_table(doc, copy):
    """Add To/From/Date/Subject fields."""
    table = doc.add_table(rows=len(copy["fields"]), cols=2)
    prevent_table_indent(table)
    set_table_widths(table, [3.4, 13.2])
    for index, (label, value) in enumerate(copy["fields"]):
        label_cell = table.cell(index, 0)
        value_cell = table.cell(index, 1)
        shade_cell(label_cell, LIGHT_FILL)
        for cell in (label_cell, value_cell):
            set_cell_borders(
                cell,
                top=("4", "C8D9EB"),
                left=("4", "C8D9EB"),
                bottom=("4", "C8D9EB"),
                right=("4", "C8D9EB"),
            )
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        label_p = label_cell.paragraphs[0]
        set_paragraph_spacing(label_p, before=2, after=2)
        label_run = label_p.add_run(label)
        set_run_font(label_run, size=10, bold=True, color=NAVY)
        value_p = value_cell.paragraphs[0]
        set_paragraph_spacing(value_p, before=2, after=2)
        add_text(value_p, value, size=11, color=NAVY)
    spacer = doc.add_paragraph()
    set_paragraph_spacing(spacer, before=0, after=4)


def add_caveat_box(doc, copy):
    """Add the honest-fit caveat callout."""
    table = doc.add_table(rows=1, cols=1)
    prevent_table_indent(table)
    set_table_widths(table, [16.6])
    cell = table.cell(0, 0)
    shade_cell(cell, LIGHT_FILL)
    set_cell_borders(
        cell,
        top=("8", "635BFF"),
        left=("8", "635BFF"),
        bottom=("8", "635BFF"),
        right=("8", "635BFF"),
    )
    heading = cell.paragraphs[0]
    set_paragraph_spacing(heading, before=2, after=2)
    heading_run = heading.add_run(copy["caveat_heading"])
    set_run_font(heading_run, size=10, bold=True, color=BLUE)
    body = cell.add_paragraph()
    set_paragraph_spacing(body, before=0, after=2)
    add_text(body, copy["caveat"], size=10, color=GRAY)
    spacer = doc.add_paragraph()
    set_paragraph_spacing(spacer, before=0, after=4)


def add_snapshot_table(doc, copy):
    """Add the compact 40-user cost snapshot."""
    headers = copy["snapshot_headers"]
    rows = copy["snapshot_rows"]
    table = doc.add_table(rows=1 + len(rows), cols=4)
    prevent_table_indent(table)
    set_table_widths(table, [4.4, 4.1, 4.1, 4.0])
    for col, header in enumerate(headers):
        cell = table.cell(0, col)
        shade_cell(cell, "0A2540")
        set_cell_borders(
            cell,
            top=("4", "0A2540"),
            left=("4", "0A2540"),
            bottom=("4", "0A2540"),
            right=("4", "0A2540"),
        )
        paragraph = cell.paragraphs[0]
        set_paragraph_spacing(paragraph, before=3, after=3)
        run = paragraph.add_run(header)
        set_run_font(run, size=9, bold=True, color=WHITE)
    for row_index, row in enumerate(rows):
        for col, value in enumerate(row):
            cell = table.cell(row_index + 1, col)
            shade_cell(cell, "FFFFFF" if row_index % 2 == 0 else ROW_ALT)
            set_cell_borders(
                cell,
                top=("4", "D9E4EE"),
                left=("4", "D9E4EE"),
                bottom=("4", "D9E4EE"),
                right=("4", "D9E4EE"),
            )
            paragraph = cell.paragraphs[0]
            set_paragraph_spacing(paragraph, before=2, after=2)
            is_oneai = col == 3
            run = paragraph.add_run(value)
            set_run_font(
                run,
                size=9,
                bold=is_oneai or col == 0,
                color=NAVY if is_oneai or col == 0 else GRAY,
            )
    note = doc.add_paragraph()
    set_paragraph_spacing(note, before=6, after=4)
    add_text(note, copy["snapshot_note"], size=9, italic=True, color=MUTED)


def add_signature(doc, copy):
    """Add the sender sign-off with placeholder fields."""
    signoff = doc.add_paragraph()
    set_paragraph_spacing(signoff, before=12, after=16)
    add_text(signoff, copy["signoff"], size=11, color=GRAY)
    for key, size, bold in (
        ("signature_name", 12, True),
        ("signature_role", 11, False),
        ("signature_contact", 10, False),
    ):
        paragraph = doc.add_paragraph()
        set_paragraph_spacing(paragraph, before=0, after=1)
        add_text(paragraph, copy[key], size=size, bold=bold, color=NAVY)


def add_footer_line(doc, copy):
    """Add the vendor contact footer."""
    paragraph = doc.add_paragraph()
    set_paragraph_spacing(paragraph, before=16, after=0)
    paragraph.paragraph_format.border_top = None
    p_pr = paragraph._p.get_or_add_pPr()
    p_bdr = OxmlElement("w:pBdr")
    top = OxmlElement("w:top")
    top.set(qn("w:val"), "single")
    top.set(qn("w:sz"), "8")
    top.set(qn("w:space"), "8")
    top.set(qn("w:color"), RULE)
    p_bdr.append(top)
    p_pr.append(p_bdr)
    add_text(paragraph, copy["footer"], size=8, color=MUTED)


def build_document(copy):
    """Build one locale's leadership memo and write it to public/documents."""
    doc = Document()
    section = doc.sections[0]
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(2.2)
    section.right_margin = Cm(2.2)
    section.top_margin = Cm(1.8)
    section.bottom_margin = Cm(1.8)
    doc.core_properties.title = copy["core_title"]
    doc.core_properties.subject = copy["core_subject"]
    doc.core_properties.author = "Hyperjump Technology"
    doc.core_properties.category = "OneAI"

    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(11)
    style.font.color.rgb = GRAY

    add_header_bar(doc, copy)
    add_instruction_box(doc, copy)
    add_field_table(doc, copy)
    add_heading_paragraph(doc, copy["request_heading"])
    for para in copy["request_paras"]:
        add_body_paragraph(doc, para)
    add_heading_paragraph(doc, copy["why_heading"])
    add_body_paragraph(doc, copy["why_intro"], after=6)
    for title, text in copy["why_points"]:
        add_bullet(doc, title, text)
    add_body_paragraph(doc, copy["why_close"])
    add_heading_paragraph(doc, copy["why_oneai_heading"])
    add_body_paragraph(doc, copy["why_oneai_intro"], after=6)
    for item in copy["plan_points"]:
        add_plain_bullet(doc, item)
    add_body_paragraph(doc, copy["why_oneai_close"])
    add_caveat_box(doc, copy)
    add_heading_paragraph(doc, copy["snapshot_heading"])
    add_snapshot_table(doc, copy)
    add_heading_paragraph(doc, copy["next_heading"])
    for index, step in enumerate(copy["next_steps"], start=1):
        paragraph = doc.add_paragraph()
        set_paragraph_spacing(paragraph, after=3)
        add_text(paragraph, f"{index}. {step}", size=11, color=GRAY)
    add_body_paragraph(doc, copy["next_close"])
    add_signature(doc, copy)
    add_footer_line(doc, copy)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / copy["output"]
    doc.save(path)
    return path


def main():
    """Generate English and Indonesian leadership memos."""
    for copy in (EN, ID):
        path = build_document(copy)
        print(f"Wrote {path.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
