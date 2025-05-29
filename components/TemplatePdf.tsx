import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.6,
    fontFamily: "Times-Roman",
  },
  text: {
    color: "#000",
    whiteSpace: "pre-wrap",
  },
});

export default function TemplatePdf({ content }: { content: string }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.text}>{content}</Text>
      </Page>
    </Document>
  );
}
