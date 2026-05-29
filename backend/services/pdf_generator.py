from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

def generate_pdf(data, filename):

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(
        "AI Interview Report",
        styles['Title']
    )

    elements.append(title)

    elements.append(
        Spacer(1, 20)
    )

    for key, value in data.items():

        text = f"<b>{key}</b>: {value}"

        paragraph = Paragraph(
            text,
            styles['BodyText']
        )

        elements.append(paragraph)

        elements.append(
            Spacer(1, 12)
        )

    doc.build(elements)