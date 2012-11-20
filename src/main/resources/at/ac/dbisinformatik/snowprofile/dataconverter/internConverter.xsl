<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<SnowProfile 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:caaml="http://www.caaml.org/v5.0/Snowprofile/IACS"
	xmlns:gml="http://www.opengis.net/gml"
	xmlns:app="http://www.snowprofileapplication.com"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://caaml.org/Schemas/V5.0/Profiles/SnowProfileIACS
	http://caaml.avisualanche.ca/Schemas/V5.0/Profiles/SnowprofileIACS/CAAMLv5_SnowProfileIACS.xsd"
	gml:id="SLF7245">
	<metaDataProperty>
		<MetaData>
			<srcRef>
				<Operation gml:id="SLF">
					<contactPerson>
						<Person gml:id="PersonID01">
							<name><xsl:value-of select="SnowProfile/metaDataProperty/MetaData/srcRef/Operation/contactPerson/Person/name"/></name>
						</Person>
					</contactPerson>
				</Operation>
			</srcRef>
		</MetaData>
	</metaDataProperty>
	<!--Observation time -->
	<validTime>
		<TimeInstant>
			<timePosition><xsl:value-of select="SnowProfile/validTime/TimeInstant/timePosition"/></timePosition>
		</TimeInstant>
	</validTime>
	<!--Observation elements -->
	<snowProfileResultsOf>
		<xsl:variable name="dir" select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/dir" />
		<SnowProfileMeasurements dir="top down">
			<comment><xsl:value-of select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/comment"/></comment>
			<profileDepth uom="cm"><xsl:value-of select="SnowProfil/snowProfileResultsOfe/SnowProfileMeasurements/profileDepth"/></profileDepth>
			<skyCond><xsl:value-of select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/skyCond"/></skyCond>
			<precipTI><xsl:value-of select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/precipTI"/></precipTI>
			<airTempPres uom="degC"><xsl:value-of select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/airTempPres"/></airTempPres>
			<windSpd uom="ms-1"><xsl:value-of select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/windSpd"/></windSpd>
			<windDir>
				<AspectPosition>
					<position><xsl:value-of select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/windDir/AspectPosition/position"/></position>
				</AspectPosition>
			</windDir>
			<hS>
				<Components>
					<snowHeight uom="cm"><xsl:value-of select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/profileDepth/content"/></snowHeight>
				</Components>
			</hS>
			<!--Stratigraphic layer profile -->
			<stratProfile>
				<xsl:for-each select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/stratProfile/Layer">
				<Layer>
					<depthTop uom="cm"><xsl:value-of select="H"/></depthTop>
					<grainFormPrimary><xsl:value-of select="grainFormPrimary"/></grainFormPrimary>
					<grainFormSecondary><xsl:value-of select="grainFormSecondary"/></grainFormSecondary>
					<grainSize uom="mm">
						<Components>
							<avg><xsl:value-of select="grainSize_Components_avg"/></avg>
							<avgMax><xsl:value-of select="grainSize_Components_avgMax"/></avgMax>
						</Components>
					</grainSize>
					<hardness><xsl:value-of select="hardness"/></hardness>
					<lwc uom=""><xsl:value-of select="lwc_content"/></lwc>
				</Layer>
				</xsl:for-each>
			</stratProfile>
			<!--Temperature profile -->
			<tempProfile uomDepth="cm" uomTemp="degC">
				<xsl:for-each select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/tempProfile/Obs">
				<Obs>
					<depth><xsl:value-of select="depth"/></depth>
					<snowTemp>-<xsl:value-of select="snowTemp * 10"/></snowTemp>
				</Obs>
				</xsl:for-each>
			</tempProfile>
			<stbTests>
				<ComprTest>
					<xsl:variable name="komprTest">
						<xsl:if test="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/stbTests/ComprTest">
							true
						</xsl:if>
					</xsl:variable>
					<xsl:choose>
						<xsl:when test="$komprTest!=''">
							<failedOn>
								<xsl:for-each select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/stbTests/ComprTest">
								<Layer>
									<depthTop uom="cm"><xsl:value-of select="Layer_depthTop_content"/></depthTop>
								</Layer>
								<Results>
									<releaseType><xsl:value-of select="failedOn_Results_releaseType"/></releaseType>
									<fractureCharacter><xsl:value-of select="failedOn_Results_fractureCharacter"/></fractureCharacter>
									<testScore><xsl:value-of select="failedOn_Results_testScore"/></testScore>
								</Results>
								</xsl:for-each>
							</failedOn>
						</xsl:when>
						<xsl:otherwise>
							<noFailure />
						</xsl:otherwise>
					</xsl:choose>
				</ComprTest>
				<ExtColumnTest>
					<xsl:variable name="extKomprTest">
						<xsl:if test="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/stbTests/ExtColumnTest">
							true
						</xsl:if>
					</xsl:variable>
					<xsl:choose>
						<xsl:when test="$extKomprTest!=''">
							<failedOn>
								<xsl:for-each select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/stbTests/ExtColumnTest">
								<Layer>
									<depthTop uom="cm"><xsl:value-of select="Layer_depthTop_content"/></depthTop>
								</Layer>
								<Results>
									<releaseType><xsl:value-of select="failedOn_Results_releaseType"/></releaseType>
									<fractureCharacter><xsl:value-of select="failedOn_Results_fractureCharacter"/></fractureCharacter>
									<testScore><xsl:value-of select="failedOn_Results_testScore"/></testScore>
								</Results>
								</xsl:for-each>
							</failedOn>
						</xsl:when>
						<xsl:otherwise>
							<noFailure />
						</xsl:otherwise>
					</xsl:choose>
				</ExtColumnTest>
				<RBlockTest>
					<xsl:variable name="rblockTest">
						<xsl:if test="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/stbTests/RBlockTest">
							true
						</xsl:if>
					</xsl:variable>
					<xsl:choose>
						<xsl:when test="$rblockTest!=''">
							<failedOn>
								<xsl:for-each select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/stbTests/RBlockTest">
								<Layer>
									<depthTop uom="cm"><xsl:value-of select="Layer_depthTop_content"/></depthTop>
								</Layer>
								<Results>
									<releaseType><xsl:value-of select="failedOn_Results_releaseType"/></releaseType>
									<fractureCharacter><xsl:value-of select="failedOn_Results_fractureCharacter"/></fractureCharacter>
									<testScore><xsl:value-of select="failedOn_Results_testScore"/></testScore>
								</Results>
								</xsl:for-each>
							</failedOn>
						</xsl:when>
						<xsl:otherwise>
							<noFailure />
						</xsl:otherwise>
					</xsl:choose>
				</RBlockTest>
			</stbTests>
		</SnowProfileMeasurements>
	</snowProfileResultsOf>
	<!--Location information -->
	<locRef>
		<ObsPoint gml:id="SLF7242_1">
			<name><xsl:value-of select="SnowProfile/locRef/ObsPoint/name"/> - <xsl:value-of select="SnowProfile/locRef/ObsPoint/description"/></name>
			<obsPointSubType>Snowprofile Site</obsPointSubType>
			<validElevation>
				<ElevationPosition uom="m">
					<position><xsl:value-of select="SnowProfile/snowProfileResultsOf/SnowProfileMeasurements/profileDepth"/></position>
				</ElevationPosition>
			</validElevation>
			<validAspect>
				<AspectPosition>
					<position>
						<xsl:value-of select="SnowProfile/locRef/ObsPoint/validAspect/AspectPosition/position"/>
					</position>
				</AspectPosition>
			</validAspect>
			<validSlopeAngle>
				<SlopeAnglePosition uom="deg">
					<position><xsl:value-of select="SnowProfile/locRef/ObsPoint/validSlopeAngle/SlopeAnglePosition/position"/></position>
				</SlopeAnglePosition>
			</validSlopeAngle>
		</ObsPoint>
	</locRef>
</SnowProfile>
</xsl:template>

</xsl:stylesheet> 