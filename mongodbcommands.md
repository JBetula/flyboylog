## db.logbooks.find({flightcrew:{$regex : 'gren'}}).sort({blocktime : -1})
Hitta alla med ett del av sitt namn med grej och sotera därefter beroende på hur lång flygningen var

## db.logbooks.aggregate([ { $group: { _id: "$cmd", count: { $sum: 1 } } }, { $sort: { count: -1 } } ])



## db.logbooks.aggregate([ { $group: { _id: "$cmd", count: { $sum: "$blocktimeMinutes" } } },{ $sort: { count: -1 } }])

="javascript:__doPostBack('ctl00$Content$Dynamic$lbExportCSV','')"><span class="fa fa-file-code-o"></span> CSV</a>

<a id="ctl00_Content_Dynamic_lbExportCSV" class="btn btn-default" href="javascript:__doPostBack('ctl00$Content$Dynamic$lbExportCSV','')"><span class="fa fa-file-code-o"></span> CSV</a>


<input id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_dateInput" name="ctl00$Content$Dynamic$CurrentFilter60$rDP_Date$dateInput" class="riTextBox riEnabled" type="text">

<input id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_ClientState" name="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_ClientState" type="hidden" value="{&quot;minDateStr&quot;:&quot;1990-01-01-00-00-00&quot;,&quot;maxDateStr&quot;:&quot;2100-01-01-00-00-00&quot;}" autocomplete="off">

<tr>
                                <td valign="top">
                                    
                                    &nbsp;
                                </td>
                                <td valign="top">
                                    <div id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_wrapper" class="RadPicker RadPicker_Bootstrap">
	<input style="visibility:hidden;display:block;float:right;margin:0 0 -1px -1px;width:1px;height:1px;overflow:hidden;border:0;padding:0;" id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date" name="ctl00$Content$Dynamic$CurrentFilter60$rDP_Date" type="text" class="rdfd_ radPreventDecorate" value="" title="Visually hidden input created for functionality purposes."><div id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_dateInput_wrapper" class="RadInput RadInput_Bootstrap">
		<input id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_dateInput" name="ctl00$Content$Dynamic$CurrentFilter60$rDP_Date$dateInput" class="riTextBox riEnabled" type="text"><div class="rcSelect">
			<a title="Open the calendar popup." href="#" id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_popupButton" class="rcCalPopup"></a>
		<div id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar" class="RadCalendar RadCalendar_Bootstrap" style="display: none;">
				<div class="rcTitlebar">
					<a id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_FNP" class="t-button rcFastPrev" title="<<" href="#"><span class="t-font-icon t-i-arrow-double-60-left"></span></a><a id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_NP" class="t-button rcPrev" title="<" href="#"><span class="t-font-icon t-i-arrow-left"></span></a><div class="rcNextButtons">
						<a id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_NN" class="t-button rcNext" title=">" href="#"><span class="t-font-icon t-i-arrow-right"></span></a><a id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_FNN" class="t-button rcFastNext" title=">>" href="#"><span class="t-font-icon t-i-arrow-double-60-right"></span></a>
					</div><span id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Title" class="rcTitle">October 2023</span>
				</div><div class="rcMain">
					
				<table id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top" class="rcMainTable" border="0" style="float: left;">
						<caption>
							<span style="display:none;">November 2023</span>
						</caption><thead>
							<tr class="rcWeek">
								<th class="rcViewSel" scope="col">&nbsp;</th><th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_cs_1" title="Monday" scope="col">M</th><th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_cs_2" title="Tuesday" scope="col">T</th><th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_cs_3" title="Wednesday" scope="col">W</th><th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_cs_4" title="Thursday" scope="col">T</th><th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_cs_5" title="Friday" scope="col">F</th><th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_cs_6" title="Saturday" scope="col">S</th><th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_cs_7" title="Sunday" scope="col">S</th>
							</tr>
						</thead><tbody>
							<tr class="rcRow">
								<th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_rs_1" scope="row">40</th><td class="rcOtherMonth" title="Monday, September 25, 2023" style=""><a href="#" onclick="return false;">25</a></td><td class="rcOtherMonth" title="Tuesday, September 26, 2023" style=""><a href="#" onclick="return false;">26</a></td><td title="Wednesday, September 27, 2023" class="rcOtherMonth" style=""><a href="#" onclick="return false;">27</a></td><td title="Thursday, September 28, 2023" class="rcOtherMonth" style=""><a href="#" onclick="return false;">28</a></td><td title="Friday, September 29, 2023" class="rcOtherMonth" style=""><a href="#" onclick="return false;">29</a></td><td class="rcOtherMonth" title="Saturday, September 30, 2023" style=""><a href="#" onclick="return false;">30</a></td><td class="rcWeekend" title="Sunday, October 01, 2023" style=""><a href="#" onclick="return false;">1</a></td>
							</tr><tr class="rcRow">
								<th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_rs_2" scope="row">41</th><td title="Monday, October 02, 2023" class="rcSelected" style=""><a href="#" onclick="return false;">2</a></td><td title="Tuesday, October 03, 2023" class="" style=""><a href="#" onclick="return false;">3</a></td><td title="Wednesday, October 04, 2023" class="" style=""><a href="#" onclick="return false;">4</a></td><td title="Thursday, October 05, 2023" class="" style=""><a href="#" onclick="return false;">5</a></td><td title="Friday, October 06, 2023" class="" style=""><a href="#" onclick="return false;">6</a></td><td class="rcWeekend" title="Saturday, October 07, 2023" style=""><a href="#" onclick="return false;">7</a></td><td class="rcWeekend" title="Sunday, October 08, 2023" style=""><a href="#" onclick="return false;">8</a></td>
							</tr><tr class="rcRow">
								<th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_rs_3" scope="row">42</th><td title="Monday, October 09, 2023" class="" style=""><a href="#" onclick="return false;">9</a></td><td title="Tuesday, October 10, 2023" class="" style=""><a href="#" onclick="return false;">10</a></td><td title="Wednesday, October 11, 2023" class="" style=""><a href="#" onclick="return false;">11</a></td><td title="Thursday, October 12, 2023" class="" style=""><a href="#" onclick="return false;">12</a></td><td title="Friday, October 13, 2023" class="" style=""><a href="#" onclick="return false;">13</a></td><td class="rcWeekend" title="Saturday, October 14, 2023" style=""><a href="#" onclick="return false;">14</a></td><td class="rcWeekend" title="Sunday, October 15, 2023" style=""><a href="#" onclick="return false;">15</a></td>
							</tr><tr class="rcRow">
								<th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_rs_4" scope="row">43</th><td title="Monday, October 16, 2023" class="" style=""><a href="#" onclick="return false;">16</a></td><td title="Tuesday, October 17, 2023" class="" style=""><a href="#" onclick="return false;">17</a></td><td title="Wednesday, October 18, 2023" class="" style=""><a href="#" onclick="return false;">18</a></td><td title="Thursday, October 19, 2023" class="" style=""><a href="#" onclick="return false;">19</a></td><td title="Friday, October 20, 2023" class="" style=""><a href="#" onclick="return false;">20</a></td><td class="rcWeekend" title="Saturday, October 21, 2023" style=""><a href="#" onclick="return false;">21</a></td><td class="rcWeekend" title="Sunday, October 22, 2023" style=""><a href="#" onclick="return false;">22</a></td>
							</tr><tr class="rcRow">
								<th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_rs_5" scope="row">44</th><td title="Monday, October 23, 2023" class="" style=""><a href="#" onclick="return false;">23</a></td><td title="Tuesday, October 24, 2023" class="" style=""><a href="#" onclick="return false;">24</a></td><td title="Wednesday, October 25, 2023" class="" style=""><a href="#" onclick="return false;">25</a></td><td title="Thursday, October 26, 2023" class="" style=""><a href="#" onclick="return false;">26</a></td><td class="" title="Friday, October 27, 2023" style=""><a href="#" onclick="return false;">27</a></td><td class="rcWeekend" title="Saturday, October 28, 2023" style=""><a href="#" onclick="return false;">28</a></td><td class="rcWeekend" title="Sunday, October 29, 2023" style=""><a href="#" onclick="return false;">29</a></td>
							</tr><tr class="rcRow">
								<th id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_Top_rs_6" scope="row">45</th><td class="" title="Monday, October 30, 2023" style=""><a href="#" onclick="return false;">30</a></td><td class="" title="Tuesday, October 31, 2023" style=""><a href="#" onclick="return false;">31</a></td><td class="rcOtherMonth" title="Wednesday, November 01, 2023" style=""><a href="#" onclick="return false;">1</a></td><td class="rcOtherMonth" title="Thursday, November 02, 2023" style=""><a href="#" onclick="return false;">2</a></td><td class="rcOtherMonth" title="Friday, November 03, 2023" style=""><a href="#" onclick="return false;">3</a></td><td class="rcOtherMonth" title="Saturday, November 04, 2023" style=""><a href="#" onclick="return false;">4</a></td><td class="rcOtherMonth" title="Sunday, November 05, 2023" style=""><a href="#" onclick="return false;">5</a></td>
							</tr>
						</tbody>
					</table></div><input type="hidden" name="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_SD" id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_SD" value="[[2023,10,2]]" autocomplete="off"><input type="hidden" name="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_AD" id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_calendar_AD" value="[[1990,1,1],[2100,1,1],[2023,10,1]]" autocomplete="off">
			</div></div><input id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_dateInput_ClientState" name="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_dateInput_ClientState" type="hidden" autocomplete="off" value="{&quot;enabled&quot;:true,&quot;emptyMessage&quot;:&quot;&quot;,&quot;validationText&quot;:&quot;2023-10-02-00-00-00&quot;,&quot;valueAsString&quot;:&quot;2023-10-02-00-00-00&quot;,&quot;minDateStr&quot;:&quot;1990-01-01-00-00-00&quot;,&quot;maxDateStr&quot;:&quot;2100-01-01-00-00-00&quot;,&quot;lastSetTextBoxValue&quot;:&quot;2/10/2023&quot;}">
	</div><input id="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_ClientState" name="ctl00_Content_Dynamic_CurrentFilter60_rDP_Date_ClientState" type="hidden" value="{&quot;minDateStr&quot;:&quot;1990-01-01-00-00-00&quot;,&quot;maxDateStr&quot;:&quot;2100-01-01-00-00-00&quot;}" autocomplete="off">
</div>
                                </td>
                                <td>
                                    <span id="ctl00_Content_Dynamic_CurrentFilter60_rfvDate" style="color:Red;visibility:hidden;">*</span>
                                </td>
                            </tr>