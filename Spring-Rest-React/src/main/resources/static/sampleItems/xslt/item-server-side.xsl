<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lido="http://www.lido-schema.org">

    <xsl:template match="/">
        <html>
            <body>
                <h1>Painting item</h1>
                <table border="1">
                    <tr>
                        <th>Record ID</th>
                        <th>Record ID copy</th>
                    </tr>
		 <xsl:for-each select="//lido:administrativeMetadata/lido:recordWrap/lido:recordID">
                    <tr>
                        <td><xsl:value-of select="//lido:administrativeMetadata/lido:recordWrap/lido:recordID" /></td>
                        <td><xsl:value-of select="//lido:administrativeMetadata/lido:recordWrap/lido:recordID" /></td>
                    </tr>
                 </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet> 