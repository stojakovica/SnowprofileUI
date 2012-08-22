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
			<!--NEW: dateTimeReport new required element -->
			<dateTimeReport>
				<xsl:call-template name="FormatDate">
					<xsl:with-param name="DateTime" select="SPP-Profil/Generator/Datum" />
				</xsl:call-template>
			</dateTimeReport>
			<srcRef>
				<Operation gml:id="SLF">
					<name></name>
					<contactPerson>
						<Person gml:id="PersonID01">
							<name><xsl:value-of select="SPP-Profil/Kopf/Beobachter"/></name>
						</Person>
					</contactPerson>
				</Operation>
			</srcRef>
		</MetaData>
	</metaDataProperty>
	<!--Observation time -->
	<validTime>
		<TimeInstant>
			<timePosition>
				<xsl:variable name="datum" select="SPP-Profil/Kopf/Datum" />
				<xsl:variable name="zeit" select="SPP-Profil/Kopf/Zeit" />
				<xsl:call-template name="FormatDate">
					<xsl:with-param name="DateTime" select="concat($datum, ' ', $zeit)" />
				</xsl:call-template>
			</timePosition>
		</TimeInstant>
	</validTime>
	<!--Observation elements -->
	<snowProfileResultsOf>
		<SnowProfileMeasurements dir="top down">
			<!--General Comment -->
			<comment><xsl:value-of select="SPP-Profil/Textfeld/Text"/></comment>
			<!--Header information -->
			<profileDepth uom="cm"><xsl:value-of select="SPP-Profil/Schichtprofil/Schicht/H"/></profileDepth>
			<skyCond>
				<xsl:call-template name="FormatBewoelkung">
					<xsl:with-param name="Bewoelkung" select="SPP-Profil/Kopf/Bewoelkung" />
				</xsl:call-template>
			</skyCond>
			<precipTI>
				<xsl:variable name="precipTI"><xsl:value-of select="SPP-Profil/Kopf/Niederschlag"/></xsl:variable>
				<xsl:choose>
					<xsl:when test="$precipTI=''"></xsl:when>
					<xsl:when test="$precipTI='kein Niederschlag'">Nil</xsl:when>
					<xsl:when test="$precipTI='Schneefall'">SN</xsl:when>
					<xsl:when test="$precipTI='Regen'">RA</xsl:when>
					<xsl:when test="$precipTI='Graupel'">GS</xsl:when>
				</xsl:choose>
			</precipTI>
			<airTempPres uom="degC"><xsl:value-of select="SPP-Profil/Kopf/Temperatur"/></airTempPres>
			<windSpd uom="ms-1"><xsl:value-of select="SPP-Profil/Kopf/WindStaerke div 3.6"/></windSpd>
			<windDir>
				<AspectPosition>
					<position><xsl:value-of select="SPP-Profil/Kopf/WindRichtung"/></position>
				</AspectPosition>
			</windDir>
			<hS>
				<Components>
					<snowHeight uom="cm"><xsl:value-of select="SPP-Profil/Kopf/Schneehoehe"/></snowHeight>
				</Components>
			</hS>
			<!--Stratigraphic layer profile -->
			<stratProfile>
				<xsl:for-each select="SPP-Profil/Schichtprofil/Schicht">
				<Layer>
					<depthTop uom="cm"><xsl:value-of select="H"/></depthTop>
					<xsl:variable name="f1"><xsl:value-of select="F1"/></xsl:variable>
					<xsl:variable name="f2"><xsl:value-of select="F2"/></xsl:variable>
					<xsl:variable name="f3"><xsl:value-of select="F3"/></xsl:variable>
					<grainFormPrimary>
						<xsl:variable name="grainFormPrimary"><xsl:value-of select="$f1"/></xsl:variable>
						<xsl:choose>
							<xsl:when test="$grainFormPrimary='0'">PPgp</xsl:when>
							<xsl:when test="$grainFormPrimary='1'">PP</xsl:when>
							<xsl:when test="$grainFormPrimary='2'">DF</xsl:when>
							<xsl:when test="$grainFormPrimary='3'">RG</xsl:when>
							<xsl:when test="$grainFormPrimary='4'">FC</xsl:when>
							<xsl:when test="$grainFormPrimary='5'">DH</xsl:when>
							<xsl:when test="$grainFormPrimary='6'">MF</xsl:when>
							<xsl:when test="$grainFormPrimary='7'">SH</xsl:when>
							<xsl:when test="$grainFormPrimary='8'">IF</xsl:when>
						</xsl:choose>
					</grainFormPrimary>
					<grainFormSecondary>
						<xsl:choose>
							<xsl:when test="$f1 = $f2">
								<xsl:variable name="grainFormSecondary"><xsl:value-of select="$f3"/></xsl:variable>
								<xsl:choose>
									<xsl:when test="$grainFormSecondary='0'">PPgp</xsl:when>
									<xsl:when test="$grainFormSecondary='1'">PP</xsl:when>
									<xsl:when test="$grainFormSecondary='2'">DF</xsl:when>
									<xsl:when test="$grainFormSecondary='3'">RG</xsl:when>
									<xsl:when test="$grainFormSecondary='4'">FC</xsl:when>
									<xsl:when test="$grainFormSecondary='5'">DH</xsl:when>
									<xsl:when test="$grainFormSecondary='6'">MF</xsl:when>
									<xsl:when test="$grainFormSecondary='7'">SH</xsl:when>
									<xsl:when test="$grainFormSecondary='8'">IF</xsl:when>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<xsl:variable name="grainFormSecondary"><xsl:value-of select="$f2"/></xsl:variable>
								<xsl:choose>
									<xsl:when test="$grainFormSecondary='0'">PPgp</xsl:when>
									<xsl:when test="$grainFormSecondary='1'">PP</xsl:when>
									<xsl:when test="$grainFormSecondary='2'">DF</xsl:when>
									<xsl:when test="$grainFormSecondary='3'">RG</xsl:when>
									<xsl:when test="$grainFormSecondary='4'">FC</xsl:when>
									<xsl:when test="$grainFormSecondary='5'">DH</xsl:when>
									<xsl:when test="$grainFormSecondary='6'">MF</xsl:when>
									<xsl:when test="$grainFormSecondary='7'">SH</xsl:when>
									<xsl:when test="$grainFormSecondary='8'">IF</xsl:when>
								</xsl:choose>
							</xsl:otherwise>
						</xsl:choose>
					</grainFormSecondary>
					<grainSize uom="mm">
						<Components>
							<avg><xsl:value-of select="D1 div 100"/></avg>
							<avgMax><xsl:value-of select="D2 div 100"/></avgMax>
						</Components>
					</grainSize>
					<hardness>
						<xsl:variable name="hardness"><xsl:value-of select="K1"/>-<xsl:value-of select="K2"/></xsl:variable>
						<xsl:choose>
							<xsl:when test="$hardness='1-1'">F</xsl:when>
							<xsl:when test="$hardness='1-2'">F-4F</xsl:when>
							<xsl:when test="$hardness='2-2'">4F</xsl:when>
							<xsl:when test="$hardness='2-3'">4F-1F</xsl:when>
							<xsl:when test="$hardness='3-3'">1F</xsl:when>
							<xsl:when test="$hardness='3-4'">1F-P</xsl:when>
							<xsl:when test="$hardness='4-4'">P</xsl:when>
							<xsl:when test="$hardness='4-5'">P-K</xsl:when>
							<xsl:when test="$hardness='5-5'">K</xsl:when>
							<xsl:when test="$hardness='6-6'">I</xsl:when>
						</xsl:choose>
					</hardness>
					<lwc uom="">
						<xsl:variable name="lwc"><xsl:value-of select="W1"/>-<xsl:value-of select="W2"/></xsl:variable>
						<xsl:choose>
							<xsl:when test="$lwc='1-1'">D</xsl:when>
							<xsl:when test="$lwc='1-2'">D-M</xsl:when>
							<xsl:when test="$lwc='2-2'">M</xsl:when>
							<xsl:when test="$lwc='2-3'">M-W</xsl:when>
							<xsl:when test="$lwc='3-3'">W</xsl:when>
							<xsl:when test="$lwc='3-4'">W-V</xsl:when>
							<xsl:when test="$lwc='4-4'">V</xsl:when>
							<xsl:when test="$lwc='4-5'">V-S</xsl:when>
							<xsl:when test="$lwc='5-5'">S</xsl:when>
						</xsl:choose>
					</lwc>
				</Layer>
				</xsl:for-each>
			</stratProfile>
			<!--Temperature profile -->
			<tempProfile uomDepth="cm" uomTemp="degC">
				<xsl:for-each select="SPP-Profil/Schneetemperatur/Schicht">
				<Obs>
					<depth><xsl:value-of select="H div 10"/></depth>
					<snowTemp>-<xsl:value-of select="T"/></snowTemp>
				</Obs>
				</xsl:for-each>
			</tempProfile>
			<!--Density Profile -->
			<densityProfile uomDepthTop="cm" uomThickness="cm"
				uomDensity="kgm-3">
				<xsl:for-each select="SPP-Profil/Dichte/Schicht">
				<Layer>
					<depthTop><xsl:value-of select="H div 10"/></depthTop>
					<thickness><xsl:value-of select="TH div 10"/></thickness>
					<density><xsl:value-of select="R"/></density>
				</Layer>
				</xsl:for-each>
			</densityProfile>
			<!--Ram Profile -->
			<hardnessProfile uomHardness="N" uomThickness="cm"
				uomDepthTop="cm" uomWeightHammer="kg" uomWeightTube="kg"
				uomDropHeight="cm">
				<xsl:if test="SPP-Profil/Rammwiderstand/Schicht">
					<MetaData>
						<methodOfMeas>Ram Sonde</methodOfMeas>
					</MetaData>
					<xsl:for-each select="SPP-Profil/Rammwiderstand/Schicht">
					<Layer>
						<depthTop><xsl:value-of select="X"/></depthTop>
						<thickness><xsl:value-of select="D"/></thickness>
						<hardness><xsl:value-of select="R * 9.80665"/></hardness>
					</Layer>
					</xsl:for-each>
				</xsl:if>
			</hardnessProfile>
			<stbTests>
				<ComprTest>
					<xsl:variable name="komprTest">
						<xsl:if test="SPP-Profil/Kompressionstest/Schicht">
							true
						</xsl:if>
					</xsl:variable>
					<xsl:choose>
						<xsl:when test="$komprTest!=''">
							<failedOn>
								<xsl:for-each select="SPP-Profil/Kompressionstest/Schicht">
								<Layer>
									<depthTop uom="cm"><xsl:value-of select="H div 10"/></depthTop>
								</Layer>
								<Results>
									<fractureCharacter>
										<xsl:variable name="fc"><xsl:value-of select="GS"/></xsl:variable>
										<xsl:choose>
											<xsl:when test="$fc='glatt'">Clean</xsl:when>
											<xsl:when test="$fc='1'">Rough</xsl:when>
											<xsl:when test="$fc='2'">Irregular</xsl:when>
										</xsl:choose>
									</fractureCharacter>
									<testScore><xsl:value-of select="RBT"/></testScore>
								</Results>
								</xsl:for-each>
							</failedOn>
						</xsl:when>
						<xsl:otherwise>
							<noFailure />
						</xsl:otherwise>
					</xsl:choose>
				</ComprTest>
				<RBlockTest>
					<xsl:variable name="rbTest">
						<xsl:if test="SPP-Profil/Rutschblocktest/Schicht">
							true
						</xsl:if>
					</xsl:variable>
					<xsl:choose>
						<xsl:when test="$rbTest!=''">
							<failedOn>
								<xsl:for-each select="SPP-Profil/Rutschblocktest/Schicht">
								<Layer>
									<depthTop uom="cm"><xsl:value-of select="H div 10"/></depthTop>
								</Layer>
								<Results>
									<fractureCharacter>
										<xsl:variable name="fc"><xsl:value-of select="GS"/></xsl:variable>
										<xsl:choose>
											<xsl:when test="$fc='glatt'">Clean</xsl:when>
											<xsl:when test="$fc='1'">Rough</xsl:when>
											<xsl:when test="$fc='2'">Irregular</xsl:when>
										</xsl:choose>
									</fractureCharacter>
									<testScore><xsl:value-of select="RBT"/></testScore>
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
			<name><xsl:value-of select="SPP-Profil/Kopf/Ort"/> - <xsl:value-of select="SPP-Profil/Kopf/Region"/> - <xsl:value-of select="SPP-Profil/Kopf/Bundesland"/></name>
			<obsPointSubType>Snowprofile Site</obsPointSubType>
			<validElevation>
				<ElevationPosition uom="m">
					<position><xsl:value-of select="SPP-Profil/Kopf/Seehoehe"/></position>
				</ElevationPosition>
			</validElevation>
			<validAspect>
				<AspectPosition>
					<position>
						<xsl:value-of select="SPP-Profil/Kopf/Exposition"/>
					</position>
				</AspectPosition>
			</validAspect>
			<validSlopeAngle>
				<SlopeAnglePosition uom="deg">
					<position><xsl:value-of select="SPP-Profil/Kopf/Neigung"/></position>
				</SlopeAnglePosition>
			</validSlopeAngle>
		</ObsPoint>
	</locRef>
</SnowProfile>
</xsl:template>

<xsl:template name="FormatDate">
	<xsl:param name="DateTime" />
	<!-- new date format 2006-01-14T08:55:22 -->
	<xsl:variable name="day">
		<xsl:value-of select="substring($DateTime,1,2)" />
	</xsl:variable>
	<xsl:variable name="mon-temp">
		<xsl:value-of select="substring-after($DateTime,'.')" />
	</xsl:variable>
	<xsl:variable name="mon">
		<xsl:value-of select="substring-before($mon-temp,'.')" />
	</xsl:variable>
	<xsl:variable name="year-temp">
		<xsl:value-of select="substring-after($mon-temp,'.')" />
	</xsl:variable>
	<xsl:variable name="year">
		<xsl:value-of select="substring($year-temp,1,4)" />
	</xsl:variable>
	<xsl:variable name="time">
		<xsl:value-of select="substring-after($year-temp,' ')" />
	</xsl:variable>
	<xsl:variable name="hh">
		<xsl:value-of select="substring($time,1,2)" />
	</xsl:variable>
	<xsl:variable name="mm">
		<xsl:value-of select="substring($time,4,2)" />
	</xsl:variable>
	<xsl:variable name="ss">
		<xsl:value-of select="substring($time,7,2)" />
	</xsl:variable>
	<xsl:value-of select="$year" />
	<xsl:value-of select="'-'" />
	<xsl:value-of select="$mon" />
	<xsl:value-of select="'-'" />
	<xsl:if test="(string-length($day) &lt; 2)">
		<xsl:value-of select="0" />
	</xsl:if>
	<xsl:value-of select="$day" />
	<xsl:value-of select="'T'" />
	<xsl:value-of select="$hh" />
	<xsl:value-of select="':'" />
	<xsl:value-of select="$mm" />
	<xsl:value-of select="':'" />
	<xsl:choose>
		<xsl:when test="$ss=''">00</xsl:when>
		<xsl:otherwise><xsl:value-of select="$ss"/></xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="FormatBewoelkung">
	<xsl:param name="Bewoelkung" />
	<xsl:variable name="temp">
		<xsl:value-of select="substring-after($Bewoelkung,'(')" />
	</xsl:variable>
	<xsl:variable name="wert">
		<xsl:value-of select="substring-before($temp,')')" />
	</xsl:variable>
	<xsl:variable name="first">
		<xsl:value-of select="substring-before($wert,'-')" />
	</xsl:variable>
	<xsl:variable name="second">
		<xsl:value-of select="substring-after($wert,'-')" />
	</xsl:variable>
	<xsl:choose>
		<xsl:when test="$first='0/8'">CLR</xsl:when>
		<xsl:when test="$first='1/8'">FEW</xsl:when>
		<xsl:when test="$first='2/8'">FEW</xsl:when>
		<xsl:when test="$first='4/8'">SCT</xsl:when>
		<xsl:when test="$first='6/8'">BKN</xsl:when>
		<xsl:when test="$first='8/8'">OVC</xsl:when>
		<xsl:when test="$first='9/8'">X</xsl:when>
	</xsl:choose>
</xsl:template>

</xsl:stylesheet> 