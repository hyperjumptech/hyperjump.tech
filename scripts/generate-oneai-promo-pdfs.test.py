"""Tests for OneAI promo PDF wrapping and print layout."""

from __future__ import annotations

import importlib.util
import io
import unittest
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

_SPEC = importlib.util.spec_from_file_location(
    "generate_oneai_promo_pdfs",
    Path(__file__).with_name("generate-oneai-promo-pdfs.py"),
)
assert _SPEC is not None and _SPEC.loader is not None
mod = importlib.util.module_from_spec(_SPEC)
_SPEC.loader.exec_module(mod)


class PromoPdfLayoutTests(unittest.TestCase):
    """Guard the plan-band wrap so copy cannot collide with the compare column."""

    def setUp(self) -> None:
        """Create a throwaway canvas for width measurements."""
        self.c = canvas.Canvas(io.BytesIO(), pagesize=A4)

    def test_includes_lines_stay_left_of_compare_column(self) -> None:
        """Every includes line must end before the compare column starts."""
        for copy in (mod.EN, mod.ID):
            for line in mod.wrap(
                self.c, copy["includes"], "Helvetica", 8, mod.PLAN_LEFT_W
            ):
                width = self.c.stringWidth(line, "Helvetica", 8)
                self.assertLessEqual(width, mod.PLAN_LEFT_W, line)
                self.assertLess(
                    mod.MARGIN + width,
                    mod.PLAN_RIGHT_X - 8,
                    line,
                )

    def test_sso_does_not_cross_the_gutter(self) -> None:
        """The SSO mention must not be drawn into the right-hand column."""
        for copy in (mod.EN, mod.ID):
            lines = mod.wrap(
                self.c, copy["includes"], "Helvetica", 8, mod.PLAN_LEFT_W
            )
            sso_lines = [line for line in lines if "SSO" in line]
            self.assertEqual(len(sso_lines), 1, copy["includes"])
            end = mod.MARGIN + self.c.stringWidth(sso_lines[0], "Helvetica", 8)
            self.assertLess(end, mod.PLAN_RIGHT_X - 8, sso_lines[0])

    def test_draw_wrapped_uses_requested_size_after_larger_font(self) -> None:
        """Wrapping must honor the requested size even if the canvas font is larger."""
        self.c.setFont("Helvetica", 9)
        text = mod.ID["includes"]
        mod.draw_wrapped(
            self.c, mod.MARGIN, 200, text, "Helvetica", 8, mod.PLAN_LEFT_W, 11
        )
        for line in mod.wrap(self.c, text, "Helvetica", 8, mod.PLAN_LEFT_W):
            self.assertLessEqual(
                self.c.stringWidth(line, "Helvetica", 8), mod.PLAN_LEFT_W, line
            )

    def test_compare_title_fits_right_column(self) -> None:
        """Compare headings must wrap inside the right column."""
        right_w = mod.PAGE_W - mod.MARGIN - mod.PLAN_RIGHT_X
        for copy in (mod.EN, mod.ID):
            for line in mod.wrap(
                self.c, copy["compare_title"], "Helvetica-Bold", 9, right_w
            ):
                self.assertLessEqual(
                    self.c.stringWidth(line, "Helvetica-Bold", 9),
                    right_w,
                    line,
                )

    def test_italic_allowance_helper(self) -> None:
        """Allowance is detected as a loanword and maps to an oblique font."""
        self.assertTrue(mod.is_allowance_token("Allowance"))
        self.assertTrue(mod.is_allowance_token("allowance,"))
        self.assertFalse(mod.is_allowance_token("SSO"))
        self.assertEqual(mod.italic_font("Helvetica-Bold"), "Helvetica-BoldOblique")

    def test_wrap_keeps_oversized_word(self) -> None:
        """A single word wider than max_w is still emitted as its own line."""
        lines = mod.wrap(self.c, "Hi Supercalifragilistic", "Helvetica", 8, 20)
        self.assertEqual(lines[0], "Hi")
        self.assertEqual(lines[1], "Supercalifragilistic")


if __name__ == "__main__":
    unittest.main()
