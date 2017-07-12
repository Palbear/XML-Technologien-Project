<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lido="http://www.lido-schema.org">

<xsl:template match="/">

  	<h2>Painting Item</h2>  
  	<xsl:apply-templates/>

</xsl:template>

<xsl:template match="lido:lidoWrap">
        
                <table border="1">
                    <tr>
                        <th bgcolor="#9acd32"> Title </th>
                        <th>
                            <xsl:for-each select="//lido:descriptiveMetadata/lido:objectIdentificationWrap/lido:titleWrap//lido:appellationValue">
        		 				<xsl:value-of select="." /> <br />
							</xsl:for-each> 
                        </th>
                    </tr>
                    <tr>
                        <th bgcolor="#9acd32">Artist/Maker</th>
                        <th>
                            <xsl:for-each select="//lido:descriptiveMetadata/lido:eventWrap//lido:event">
                            	<xsl:value-of select="./lido:eventType/lido:term" /> - 
        		 				<xsl:value-of select=".//lido:eventActor//lido:actor//lido:appellationValue" /> <br />
							</xsl:for-each>
                        </th>
                    </tr>
                    
                    <tr>
                        <th bgcolor="#9acd32">Date</th>
                        <th>
        					<xsl:for-each select="//lido:descriptiveMetadata/lido:eventWrap//lido:event/lido:eventDate/lido:displayDate">
        		 				<xsl:value-of select="." /> <br />
							</xsl:for-each> 
                        </th>
                    </tr>                  
                    
                    <tr>
                        <th bgcolor="#9acd32">Category</th>
                        <th>
                            <xsl:value-of select="//lido:descriptiveMetadata//lido:objectWorkTypeWrap/lido:objectWorkType/lido:term" />
                        </th>
                    </tr>
                    <tr>
                        <th bgcolor="#9acd32"> Inscription </th>
                        <th>
                            <xsl:value-of select="//lido:descriptiveMetadata//lido:inscriptionsWrap//lido:inscriptionTranscription" />
                        </th>
                    </tr>
                    <tr>
                        <th bgcolor="#9acd32">Depicted Person</th>
                        <th>
                            <xsl:value-of select="//lido:descriptiveMetadata/lido:objectRelationWrap/lido:subjectWrap//lido:actor/lido:nameActorSet/lido:appellationValue" />
                        </th>
                    </tr>
                    <tr>
                        <th bgcolor="#9acd32">Technique/Material</th>
                        <th>
                            <xsl:value-of select="//lido:descriptiveMetadata/lido:eventWrap/lido:eventSet/lido:event/lido:eventMaterialsTech/lido:displayMaterialsTech" />
                        </th>
                    </tr>
                    <tr>
                        <th bgcolor="#9acd32">Measurements</th>
                        <th>
                            <xsl:value-of select="//lido:descriptiveMetadata/lido:objectIdentificationWrap/lido:objectMeasurementsWrap/lido:objectMeasurementsSet/lido:displayObjectMeasurements" />
                        </th>
                    </tr>
                    <tr>
                        <th>Rights work</th>
                        <th>
                            <xsl:value-of select="//lido:administrativeMetadata/lido:rightsWorkWrap/lido:rightsWorkSet/lido:creditLine" />
                        </th>
                    </tr>
                    <tr>
                        <th>Record id</th>
                        <th>
                            <xsl:value-of select="//lido:administrativeMetadata/lido:recordWrap/lido:recordID" /> 
                        </th>
                    </tr>

                </table>
    </xsl:template>
   
</xsl:stylesheet>
