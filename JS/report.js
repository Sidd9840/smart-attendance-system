function generateReport()
{
    let type = document.getElementById("reportType").value;
    let date = document.getElementById("reportDate").value;
    let month = document.getElementById("reportMonth").value;

    let attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

    let table = document.getElementById("reportTable");

    table.innerHTML = ` 
        <tr>
            <th>Roll No</th>
            <th>Total Classes</th>
            <th>Present</th>
            <th>Attendance %</th>
            <th>Status</th>
        </tr>
    `;

    let filtered = attendance.filter(function(a)
    {
        if(type === "daily")
        {
            return a.date === date;
        }
        else
        {
            return a.date.startsWith(month);
        }
    });

    let report = {};

    filtered.forEach(function(a)
    {
        if(!report[a.roll])
        {
            report[a.roll] = {
                total: 0,
                present: 0
            };
        }

        report[a.roll].total++;

        if(a.status === "Present")
        {
            report[a.roll].present++;
        }
    });

    if(Object.keys(report).length === 0)
    {
        table.innerHTML += `
            <tr>
                <td colspan="5">No attendance record found</td>
            </tr>
        `;
        return;
    }

    for(let roll in report)
    {
        let total = report[roll].total;
        let present = report[roll].present;
        let percentage = Math.round((present / total) * 100);

        let status =
        percentage < 75 ? "Low Attendance" : "Good";

        let color =
        percentage < 75 ? "red" : "green";

        table.innerHTML += `
            <tr>
                <td>${roll}</td>
                <td>${total}</td>
                <td>${present}</td>
                <td>${percentage}%</td>
                <td style="color:${color}; font-weight:bold;">
                    ${status}
                </td>
            </tr>
        `;
    }
}